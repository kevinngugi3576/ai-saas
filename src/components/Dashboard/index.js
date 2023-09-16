import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { motion } from 'framer-motion';
import Videos from './Videos';
import Audios from './music';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');


  const handleClickOpen = (name) => {
    setOpen(true);
    setName(name)
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <motion.center
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    style={{
      marginTop: 100,
      color:'#fff'
    }}
  >
  <center><img src="logo.png" className="App-logo" alt="logo" /></center>
<div >
  <i style={{fontSize:25, fontWeight:'bold'}}>ABOUT</i>
</div>
    <p style={{fontSize:16}}>
      The video
    </p>
    <p>
    <br />
    </p>
  </motion.center>

  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, delay: 1 }}
    className="cta-button"
  >
  <center>

  <Button style={{
    marginLeft:10,
    fontWeight:'bold'
  }} variant="contained" onClick={() =>handleClickOpen('Videos')}>
  AI Videos Generator 
</Button>
<Button style={{
  marginLeft:10,
  fontWeight:'bold'
}} variant="contained" onClick={() =>handleClickOpen('Audios')}>
AI Audios Generator
</Button>
</center>
  </motion.div>

    <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'fixed', background: 'linear-gradient(310deg, #000045, #00008A)'}}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Button autoFocus color="inherit" onClick={handleClose}>
        {name}
        </Button>
      </Toolbar>
    </AppBar>
    <List style={{
      marginTop:55
    }}>
    {name === 'Videos' ?(
      <Videos />
    ):(
      <Audios />
    )}
    </List>
  </Dialog>
    </>
  )
}

export default Home