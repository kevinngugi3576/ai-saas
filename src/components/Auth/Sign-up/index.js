import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { auth, db } from '../../../FireBase';
import { useDispatch } from 'react-redux';
import { updateAuthId } from '../../../redux/dataSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();


  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
            
          }
        })
        dispatch(updateAuthId(user?.uid))
  
      }
    })
    return () => unsubscribe()
  }, [])

  const signUpFun = () => {
    setLoading(true)

    if(!firstName){
      toast.error("First Name is required!",{
        position: toast.POSITION.TOP_CENTER
      })
      setLoading(false)
    }else if(!lastName){
      toast.error("Last Name is required!",{
        position: toast.POSITION.TOP_CENTER
      })
      setLoading(false)
    }else if(!email){
      toast.error("Email is required!",{
        position: toast.POSITION.TOP_CENTER
      })
      setLoading(false)
    }else if(!password){
      toast.error("Password is required!",{
        position: toast.POSITION.TOP_CENTER
      })
      setLoading(false)
    }else{  
      db.collection('users').where("email", "==", email).get().then((resultSnapShot) => {

        // resultSnapShot is an array of docs where "email" === "user_mail"

        if (resultSnapShot.size == 0) {                      
              auth
              .createUserWithEmailAndPassword(email, password)
              .then((auth) => {
                  if (auth.user) {
                      auth.user.updateProfile({
                          photoURL: "https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d",
                      }).then((s) => {

                          db.collection('users').doc(auth.user.uid).set({
                              uid: auth.user.uid,
                              firstName,
                              lastName,
                              email,
                              limits: 5,
                              profilePhoto: "https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d",
                              timestamp: Date.now(),
                              isSubscribed:false,
                              timeOfSubscription:Date.now(),
                          }).then((r) => {
                                setLoading(false)
                                Swal.fire({
                                  icon: 'success',
                                  title: 'Success!',
                                  text: 'Your account has been created successfully!',
                                })
                              })
                      })
                  }
              })
              .catch((e) => {
                      toast.error(e.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                      setLoading(false)
              });

        } else {
            //Already registered
            setLoading(false)
            toast.error("The email you enterd already in use!", {
              position: toast.POSITION.TOP_CENTER
          })
        }

    })
    }  
}

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signUpFun}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}