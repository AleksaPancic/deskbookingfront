import './Login.css';
import { Typography, Paper, TextField , Button, InputAdornment, Box, Fade} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useCallback, useEffect, useState } from 'react';
import AppLogo from '../../assets/deskbooking.png'
import { useHistory } from "react-router";
import { loginRequest } from '../../services/loginService';


const styles = {
    transitionStyle: {
     transitionDelay:"300ms",

    },
    paperStyle: {
        width: "42vh",
        height: "460px",
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
        marginTop: "5%",
        
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
    signInButtonStyle: {
      fontWeight: "bold",
      paddingLeft: "2%",
      fontSize: '17px',
      '&:hover' : {
        textDecoration: 'underline'
      }
    }

}

const Login = (props) => {

    const [data, setData]= useState({
      username: "",
      password: ""
    });
     
    const [errorPassMessage, setErrorPassMessage] = useState('');
    const [errorUsernameMessage, setErrorUsernameMessage] = useState('');
    
    const history = useHistory();

    const handleKeyboardSubmit = useCallback(e => {
        if(e.keyCode === 13) {
          handleLogIn();
        }},[data]); 

    useEffect(() => {
      window.addEventListener('keypress', handleKeyboardSubmit);
      return () => {
        window.removeEventListener('keypress', handleKeyboardSubmit);
      }

    },[handleKeyboardSubmit])
    

    
    const handleLogIn = () => {
      setErrorPassMessage('');
      setErrorUsernameMessage('');
      const userValid = isUsernameValid(data.username);
        if(!userValid.err){
          const passValid = isPasswordValid(data.password);
          if(!passValid.err){
            loginRequest(data.username,data.password)
              .then((res) => {
                props.logIn(res);
              }).catch((error) => {
                console.log(error);
              })
            
          }
          else setErrorPassMessage(passValid.errMsg);
        }
        else setErrorUsernameMessage(userValid.errMsg);
    }

    const isPasswordValid  = (password) => {
       if(password.length < 4 ) {
         return {err: true,errMsg: "Password must be at least 4 characters long!"};
       }
       else {
        return {err: false,errMsg: ""};
       }
    }

    const isUsernameValid = (username) => {
      /*!username.endsWith("@enjoying.rs")*/
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
          Login
        </Typography>
        <Typography sx={styles.formSubtitleStyle} variant="subtitle1">
          Don't have an account yet?
          <Button sx={styles.signInButtonStyle} onClick={() => history.push('/register')}>
            SIGN UP
          </Button>
        </Typography>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your username
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
          <Typography variant="subtitle1" gutterBottom>
            Your password
          </Typography>
          <TextField
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorPassMessage.length > 0}
            helperText={errorPassMessage}
            id="password"
            type="password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          sx={styles.buttonStyle}
          variant="contained"
          onClick={() => handleLogIn()}
        >
          Login
        </Button>
      </Paper>
      </Fade>
    );
}
export default Login;


