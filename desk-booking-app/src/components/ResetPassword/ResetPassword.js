import './ResetPassword.css';
import * as React from 'react';
import { Typography, Paper, TextField , Button, InputAdornment, Box, Fade, Alert, IconButton, Collapse} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useCallback, useEffect, useState } from 'react';
import AppLogo from '../../assets/deskbookIng.png'
import { useHistory } from "react-router";
import { resetRequest } from '../../services/resetService';
import CloseIcon from '@mui/icons-material/Close';


const styles = {
    transitionStyle: {
     transitionDelay:"300ms",

    },
    paperStyle: {
        width: "42vh",
        height: "365px",
        minWidth: "200px",
        minHeight: "230px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2%",
    },
    formTitleStyle: {
        textAlign: "start",
        fontWeight: "bold"
    },
    formSubtitleStyle: {
      textAlign: "start",
    },
    buttonStyle: {
      marginTop: "5%"
    },
    inputBoxWrapperStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "4%"
    },
    appLogoStyleBox: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: "4%"
      
    },
    formLogInButtonStyle: {
      fontWeight: "bold",
      paddingLeft: "2%",
      fontSize: '17px',
      '&:hover' : {
        textDecoration: 'underline'
      }
    }

}


const ResetPassword = (props) => {

    var switchAlert = false;

    const [data, setData]= useState({
      username: ""    
    });
     
    const [open, setOpen] = React.useState(false);

    const [errorUsernameMessage, setErrorUsernameMessage] = useState('');
    
    const history = useHistory();

    const handleKeyboardSubmit = useCallback(e => {
        if(e.keyCode === 13) {
          handleResetPassword();
        }},[data]); 

    useEffect(() => {
      window.addEventListener('keypress', handleKeyboardSubmit);
      return () => {
        window.removeEventListener('keypress', handleKeyboardSubmit);
      }

    },[handleKeyboardSubmit])
    

    
    const handleResetPassword = () => {
      setErrorUsernameMessage('');
      const userValid = isUsernameValid(data.username);
      if(!userValid.err){
        switchAlert = true;
        resetRequest(data)
          .then((res) => {
            console.log(res);
            }).catch((error) => {
            console.log(error);
          })
        }
        else {
          setErrorUsernameMessage(userValid.errMsg);
        }   
     }
     const isUsernameValid = (username) => {
       if(username.length === 0){
          return {err: true,errMsg: "Enter your username!"};
        }
        else { 
          return {err: false,errMsg: ""};
        }
    }
    return (
      <Fade 
      style={styles.transitionStyle} 
      in={true} 
      appear={true}  
      >
      <Paper sx={styles.paperStyle} elevation={5}>
        <Box sx={styles.appLogoStyleBox}>
          <img src={AppLogo} alt="deskbooking" className="login-app-logo" />
        </Box>
        <Typography sx={styles.formTitleStyle} variant="h5">
          Reset your password
        </Typography>
        <Typography sx={styles.formSubtitleStyle} variant="subtitle1">
          Back to
          <Button sx={styles.formLogInButtonStyle} onClick={() => history.push('/login')} >LOG IN?</Button>
        </Typography>  
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Enter your username
          </Typography>
          <TextField
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorUsernameMessage.length > 0}
            helperText={errorUsernameMessage}
            id="username"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Box sx={styles.inputBoxWrapperStyle}>
        <Button
          sx={styles.buttonStyle}
          variant="contained"
          onClick={() => {handleResetPassword();
                         if(switchAlert){ 
                         setOpen(true);}}}
        >
          Reset password
        </Button>
        <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Check your email!
        </Alert>
      </Collapse>
        </Box>
      </Paper>
      </Fade>
    );
}
export default ResetPassword;


