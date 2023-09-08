import { Button, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { auth, db } from '../../../FireBase'
import Swal from 'sweetalert2'

function Videos() {
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
  return (
    <div style={{marginTop:30,display:'table',margin:'auto'}}>
     <TextField 
     type="text"
        label="A horse in the Alps"
        variant="outlined"
        style={{width:500}}
     />
     <center>
     <Button onClick={updateFunction}  variant="contained" fontSize="large" style={{marginTop:10,marginLeft:5,
        cursor:'pointer',fontWeight:'bold', background: 'linear-gradient(310deg, #000045, #00008A)'}}>
        Generate {currentUser?.limits}
     </Button>
     </center>

    </div>
  )
}

export default Videos