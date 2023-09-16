import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { auth, db } from "../../../FireBase";
import Swal from "sweetalert2";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Empty } from "../../Empty";
import { Loader } from "../../Loader";
import  GenerateMusic  from "../../Music";

function Music() {
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = useState(null);
  const [music, setMusic] = useState(null); // State to store audio URL
  const [isLoading, setIsLoading] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");

  useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db?.collection("users")
        ?.doc(`${user?.uid}`)
        .onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
    });

    return () => unsub();
  }, []);

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  const handleGenerateMusic = async () => {
    try {
      setIsLoading(true);
      // Call the API to fetch music
      const musicData = await GenerateMusic(textFieldValue);
      setMusic(musicData);
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const updateFunction = async () => {
    setIsLoading(true);
  
    if (currentUser?.limits === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have no limits left!",
        customClass: {
          container: "my-swal-container",
        },
      });
      setIsLoading(false);
    } else {
      const limits1 = currentUser?.limits - 1;
      try {
        await db.collection("users").doc(authId).update({
          limits: limits1,
        });
  
        // Wait for the API to generate audio
        const music = await handleGenerateMusic(textFieldValue);
  
        // Set isLoading to false only after the API has generated audio
        setIsLoading(false);
  
        // Render the audio player
        setMusic(music);
      } catch (error) {
        console.error("Error updating limits: ", error);
        setIsLoading(false);
      }
    }
  };
  const config = {
    public_key: "",
    tx_ref: Date.now(),
    amount: 1,
    currency: "KES",
    payment_options: "mobilemoney",
    customer: {
      email: "kevinngugi197@gmail.com",
      phoneNumber: "0798722388",
    },
    customizations: {
      title: "Ai SAAS",
      description: "Subscription to Ai SAAS",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const havePaid = () => {
    db.collection("users").doc(auth.currentUser.uid).update({
      isSubscribed: true,
      limits: 5,
    });
  };

  const handleFlutterPayment = useFlutterwave(config);

  const afterPay = () => {
    handleFlutterPayment({
      callback: (response) => {
        if (response.status === "successful") {
          havePaid();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
        closePaymentModal();
      },
      onClose: () => {},
    });
  };

  

  

  return (
    <div style={{ display: "table", margin: "auto" }}>
      <TextField
        type="text"
        label="A funky synth solo"
        variant="outlined"
        style={{ width: 800, marginTop: 40, marginLeft: 250, marginRight: 250 }}
        disabled={isLoading}
        value={textFieldValue}
        onChange={handleTextFieldChange}
      />
      <center>
        <Button
          onClick={updateFunction}
          variant="contained"
          fontSize="large"
          style={{
            marginTop: 10,
            marginLeft: 20,
            cursor: "pointer",
            fontWeight: "bold",
            width: 720,
            background: "linear-gradient(310deg, #000045, #00008A)",
          }}
        >
          Generate Music
        </Button>
      </center>
      <center>
        {currentUser?.limits <= 1 && (
          <i
            onClick={afterPay}
            style={{
              fontSize: 13,
              cursor: "pointer",
              marginTop: 15,
              marginLeft: 5,
            }}
          >
            You have {currentUser?.limits} limit(s), kindly click here to
            subscribe
          </i>
        )}
      </center>

      <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {!textFieldValue && <Empty label="No music generated yet" />}

        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
}

export default Music;