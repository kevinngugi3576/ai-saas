import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../../FireBase";
import Swal from "sweetalert2";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Replicate from "replicate";

function Videos() {
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db?.collection("users")
        ?.doc(`${user?.uid}`)
        .onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
    });

    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);

  const updateFunction = () => {
    if (currentUser?.limits === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have no limits left!",
        customClass: {
          container: "my-swal-container", // Replace 'my-swal-container' with your desired class name
        },
      });
    } else {
      const limits1 = currentUser?.limits - 1;
      db.collection("users").doc(authId).update({
        limits: limits1,
      });
    }
  };

  const config = {
    public_key: "FLWPUBK-f8d0aacbffe32208f371c19595882b2d-X",
    tx_ref: Date.now(),
    amount: 1,
    currency: "KES",
    payment_options: "mobilemoney",
    customer: {
      email: "kevinngugi197@gmail.com",
      phonenumber: "0798722388",
    },
    // mobilemoney
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
        closePaymentModal(); // this will close the modal programmatically
      },
      onClose: () => {},
    });
  };

  const myTest = async () => {
    const replicate = new Replicate({
      auth: "r8_dZMIiQyK4QuNjmt4U2ogSwFNF8Fpg0n33seMp", // Replace with your actual API token
    });

    try {
      const model =
        "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608";
      const input = {
        image:
          "https://replicate.delivery/pbxt/IJEPmgAlL2zNBNDoRRKFegTEcxnlRhoQxlNjPHSZEy0pSIKn/gg_bridge.jpeg",
        question: "what body of water does this bridge cross?",
      };
      const response = await replicate.run(
        "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        {
          input: {
            prompt: "A horse in the Alps",
          },
        }
      );

      console.log("Output: ", response);
    } catch (error) {}
  };

  return (
    <div style={{ display: "table", margin: "auto" }}>
      <TextField
        type="text"
        label="A horse in the Alps"
        variant="outlined"
        style={{ width: 500, marginTop: 20 }}
      />
      <center>
        <Button
          onClick={updateFunction}
          variant="contained"
          fontSize="large"
          style={{
            marginTop: 10,
            marginLeft: 5,
            cursor: "pointer",
            fontWeight: "bold",
            background: "linear-gradient(310deg, #000045, #00008A)",
          }}
        >
          Generate
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

      <Button onClick={myTest}>Test Replicate</Button>
    </div>
  );
}

export default Videos;
