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
import { Modal } from 'react-bootstrap';
import Forgotten from './Forgotten';


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

export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);


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

    if(!email){
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

      setLoading(true)
      auth.signInWithEmailAndPassword(email,password)
      .then((auth) =>{
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Signed in successfully',
          text: 'Welcome to the website!'
        })
      })
      .catch((e) =>{
              toast.error(e.message, {
                position: toast.POSITION.TOP_CENTER
            })      
            setLoading(false)     
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
            Sign In
          </Typography>
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => setModalShow(true)}  variant="body2">
                  Forgotten Password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Forgotten setModalShow={setModalShow}/>
      </Modal.Body>
    </Modal>
    </ThemeProvider>
  );
}