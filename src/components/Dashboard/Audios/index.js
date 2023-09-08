import { Button, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { auth, db } from '../../../FireBase'
import Swal from 'sweetalert2'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';


function Audio() {
    const authId = useSelector(state => state.authId)
    const [currentUser, setCurrentUser] = React.useState(null)

    React.useEffect(() => {
        const unsub = auth?.onAuthStateChanged((user) => {
          db?.collection('users')?.doc(`${user?.uid}`).onSnapshot((doc) => {
            setCurrentUser(doc.data());
          });
        });
      
        // Clean up the listener when the component unmounts
        return () => unsub();
      }, []);

    const updateFunction = () => {
        if(currentUser?.limits === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You have no limits left!',
                customClass: {
                    container: 'my-swal-container', // Replace 'my-swal-container' with your desired class name
                  }
            })
        }else{
            const limits1 = currentUser?.limits - 1
            db.collection('users').doc(authId).update({
                limits:limits1
            })
        }

    }

    const config = {
        public_key: 'FLWPUBK-f8d0aacbffe32208f371c19595882b2d-X',
        tx_ref: Date.now(),
        amount: 1,
        currency: 'KES',
        payment_options: 'mobilemoney',
        customer: {
          email: "kevinngugi197@gmail.com",
          phoneNumber: "0798722388"
          },

        // mobilemoney
        customizations: {
          title: 'Ai SAAS',
          description: 'Subscription to Ai SAAS',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
      
      
      const havePaid = () => {
      
       db.collection('users').doc(auth.currentUser.uid).update({
          isSubscribed:true,
          limits:5
       })
      
      
      }
      
      const handleFlutterPayment = useFlutterwave(config);
      
      const afterPay = () =>{
      
        handleFlutterPayment({
          callback: (response) => {
            //  console.log(response);
             if(response.status == "successful"){
              havePaid()
             }else{
               Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
               })
             }
              closePaymentModal() // this will close the modal programmatically
          },
          onClose: () => {},
        });
      }

  return (
    <div style={{display:'table',margin:'auto'}}>
     <TextField 
     type="text"
        label="A horse in the Alps"
        variant="outlined"
        style={{width:500, marginTop:20}}

     />
     <center>
     <Button onClick={updateFunction}  variant="contained" fontSize="large" style={{marginTop:10,marginLeft:5,
        cursor:'pointer',fontWeight:'bold', background: 'linear-gradient(310deg, #000045, #00008A)'}}>
        Generate
     </Button>
     </center>
     <center>

     {currentUser?.limits <= 1 &&(
        <i onClick={afterPay} style={{fontSize:13,cursor:'pointer', marginTop:15,marginLeft:5}}>You have {currentUser?.limits} limit(s), kindly click here to subscribe</i>
     )}
     </center>

    </div>
  )
}

export default Audio;