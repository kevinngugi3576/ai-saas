import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../../../../FireBase';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


function Forgotten({ setModalShow }) {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
  
  
    const resetPasword = async(e) =>{
      e.preventDefault();
      setLoading(true)
  
      if(!email){
          toast.error('Email input is empty!', {
            position: toast.POSITION.TOP_CENTER
        })
          setLoading(false)
      }else{
          const config ={
              url: "https://ai-saas-9f428.web.app/",
              handleCodeInApp: true
          };
        
            await auth
            .sendPasswordResetEmail(email,config)
            .then(() => {
             setEmail('')
             setModalShow(false)
             setLoading(false)
             toast.success("Check your email for password reset")
            })
            .catch((error)=>{
              setLoading(false)
             toast.error(error.message,{
                position: toast.POSITION.TOP_CENTER
            })
            })
      }
    }
  return (
    <Box
  >
        <center>

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign In
    </Typography>
        </center>
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={resetPasword}
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </Button>
    </Box>
  </Box>
  )
}

export default Forgotten