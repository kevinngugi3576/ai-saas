import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import logo from '../../logo.svg'
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../FireBase';
import { updateAuthId } from '../../redux/dataSlice';
import Swal from 'sweetalert2';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authId = useSelector((state) => state.authId);
  const dispatch1 = useDispatch();



  const logout = () => {
    auth.signOut();
    dispatch1(updateAuthId(''))

    Swal.fire({
      icon: 'success',
      title: 'Logout Successfully',
      text: 'See you soon!'
    })
}


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
          style={{
            background: ' linear-gradient(310deg, #000045, #00008A)',
            position: 'fixed', // Make the header fixed
            top: 0, // Distance from the top of the viewport
            width: '100%', // Set the width to take the full viewport width
          }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <img src="logo.png" alt="logo" className='App-logo'/>
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <h1 style={{fontSize:20, fontWeight:"bold"}}>AI-SAAS</h1>
          </Typography>
          {authId &&(
                         <div>

                         <Avatar  style={{cursor:'pointer'}} onClick={logout}>N</Avatar>
           
                       </div>   
                )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}