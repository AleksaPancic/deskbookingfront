import './Register.css';
import { Typography, Paper, TextField , Button, InputAdornment, Box, Fade, Select, FormControl, Divider, MenuItem, CircularProgress} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import * as React from 'react';
import { registerRequest } from '../../services/registerService';
  
const styles = {
    transitionStyle: {
      transitionDelay:"300ms",
    },
    paperStyle: {
        width: "60vh",
        height: "100%",
        minWidth: "200px",
        minHeight: "230px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "1%",
    },
    formTitleStyle: {
        textAlign: "start",
        fontWeight: "bold",
        marginLeft: "2%",
        marginTop: "2%"
    },
    formSubtitleStyle: {
      textAlign: "start",
      marginLeft: "2%",
    },
    formLogInButtonStyle: {
      fontWeight: "bold",
      paddingLeft: "2%",
      fontSize: '17px',
      '&:hover' : {
        textDecoration: 'underline'
      }
    },
    inputBoxWrapperStyle: {
      width: "100%",
      marginRight: "2%",
      marginLeft: "2%",
      marginTop: "2%",
    },
    rowInputElementsWrapper: {
      display: 'flex',

    },
    signUpButtonWrapper: {
      display: 'flex',
      justifyContent: 'center'
    },
    signUpButtonStyle: {
      marginTop:'4%',
      width: '50%'
    },
    dividerStyle : {
      marginTop: '3%',
    
    }

}

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  username: "",
  password: "",
  confirmPassword: "",
  workingUnitName:""
}

const Register = (props) => {

    const history = useHistory();
    const [data, setData]= useState({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        username: "",
        password: "",
        confirmPassword: "",
        workingUnitName:""
        });


      const [success, setSuccess] = useState('');
      const [error, setError] = useState('');
      const [spinner, setSpinner] = useState(false);
      const [errorFirstNameMessage, setErrorFirstNameMessage] = useState('');
      const [errorLastNameMessage, setErrorLastNameMessage] = useState('');
      const [errorEmailMessage, setErrorEmailMessage] = useState('');
      const [errorTelephoneMessage, setErrorTelephoneMessage] = useState('');
      const [errorUsernameMessage, setErrorUsernameMessage] = useState('');
      const [errorPassMessage, setErrorPassMessage] = useState('');
      const [errorPassConfirmationMessage, setErrorPassConfirmationMessage] = useState('');

      const handleRegistration = () => {
        setError('');
        setSuccess('');
        setErrorFirstNameMessage('');
        setErrorLastNameMessage('');
        setErrorEmailMessage('');
        setErrorTelephoneMessage('');
        setErrorUsernameMessage('');
        setErrorPassMessage('');

        const userValid = isUsernameValid(data.username);
        const passValid = isPasswordValid(data.password);
        const emailValid = isEmailValid(data.email);
        const telephoneValid = isTelephoneValid(data.telephone);
        const firstnameValid = isFirstNameValid(data.firstName);
        const lastnameValid = isLastNameValid(data.lastName);
        const confirmpw = isConfirmationPasswordValid(data.confirmPassword)

          if(!userValid.err && !passValid.err && !emailValid.err && !telephoneValid.err && !firstnameValid.err 
            && !lastnameValid.err && !confirmpw.err){
              setSpinner(true);
            registerRequest(data)
            .then((res) => {
             // console.log(res);
             setSuccess("Successfull registration, check your email for confirmation");
            }).catch((error) => {
              setError("Error " + error);
            })
            .finally(() => {
              setSpinner(false);
            })
          } else {
            setErrorPassConfirmationMessage(confirmpw.errMsg);
            setErrorLastNameMessage(lastnameValid.errMsg);
            setErrorFirstNameMessage(firstnameValid.errMsg);
            setErrorTelephoneMessage(telephoneValid.errMsg);
            setErrorEmailMessage(emailValid.errMsg);
            setErrorPassMessage(passValid.errMsg);
            setErrorUsernameMessage(userValid.errMsg);
          }
        }

      const handleKeyboardSubmit = useCallback(e => {
        if(e.keyCode === 13) {
          handleRegistration();
        }},[data]);    
    
      useEffect(() => {
        window.addEventListener('keypress', handleKeyboardSubmit);
        return () => {
        window.removeEventListener('keypress', handleKeyboardSubmit);
      }

      },[handleKeyboardSubmit])

      var passwordvalidation;
      const isPasswordValid  = (password) => {
        var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        if(password.length < 8 || password.length > 30) {
          return {err: true,errMsg: "Password must be at least 8 and maximum 30 characters long!"};
        }
        else if(!(pattern.test(password))) {
          return {err: true,errMsg: "Password must contain number, lowercase, uppercase alphabetical and special character!"};
         }
        else {
         passwordvalidation = password;
         return {err: false,errMsg: ""};
        }
     }

     const isConfirmationPasswordValid  = (confirmPassword) => {
      if(passwordvalidation !== confirmPassword) {
        return {err: true,errMsg: "Password does not match!"};
      }
      else {
       return {err: false,errMsg: ""};
      }
   }

 
     const isUsernameValid = (username) => {
        var pattern = new RegExp(/^[a-zA-Z0-9]+$/g);
        if(username.length === 0){
           return {err: true,errMsg: "Enter your username!"};
         }
        else if(!(pattern.test(username))) {
          return {err: true,errMsg: "Only alphabetic characters and numbers are allowed!"};
         }
         else { 
           return {err: false,errMsg: ""};
         }
     }

     const isEmailValid = (email) => {
        if(email.length === 0 || !(email.endsWith("@enjoying.rs"))){
           return {err: true,errMsg: "You must be part of Enjoy.ing team to use this application!"};
         }
         else { 
           return {err: false,errMsg: ""};
         }
     }

     const isTelephoneValid = (telephone) => {
        var pattern = new RegExp(/^[0-9 +]+$/);
        if(telephone.length === 0 || !(pattern.test(telephone))){
           return {err: true,errMsg: "Invalid phone number!"};
         }
         else { 
           return {err: false,errMsg: ""};
         }
     }

     const isFirstNameValid = (firstName) => {
       var pattern = new RegExp(/^[a-zA-Z]+$/g);
        if(firstName.length === 0 || !(pattern.test(firstName))){
           return {err: true,errMsg: "Only alphabetic characters are allowed!"};
         }
         else { 
           return {err: false,errMsg: ""};
         }
     }

     const isLastNameValid = (lastName) => {
        var pattern = new RegExp(/^[a-zA-Z]+$/g);
        if(lastName.length === 0 || !(pattern.test(lastName))){
           return {err: true,errMsg: "Only alphabetic characters are allowed!"};
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
      mountOnEnter 
      unmountOnExit
      >
      <Paper sx={styles.paperStyle} elevation={5}>
        <Typography sx={styles.formTitleStyle} variant="h4">
          Sign Up
        </Typography>
        <Typography sx={styles.formSubtitleStyle} variant="subtitle1">
          Already a user?
          <Button sx={styles.formLogInButtonStyle} onClick={() => history.push('/login')} >LOG IN</Button>
        </Typography>  
        <Box sx ={styles.rowInputElementsWrapper}>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your First Name
          </Typography>
          <TextField
          fullWidth 
            size="small"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorFirstNameMessage.length > 0}
            helperText={errorFirstNameMessage}
            id="firstName"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your Last Name
          </Typography>
          <TextField
          fullWidth 
            size="small"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorLastNameMessage.length > 0}
            helperText={errorLastNameMessage}
            id="lastName"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
          />
        </Box>
        </Box>
        <Divider variant="middle" sx={styles.dividerStyle} />
        <Box sx={styles.rowInputElementsWrapper}>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your enjoy.ing email
          </Typography>
          <TextField
          fullWidth 
            size="small"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorEmailMessage.length > 0}
            helperText={errorEmailMessage}
            id="email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your username
          </Typography>
          <TextField
          fullWidth 
            size="small"
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
        </Box>
        <Divider variant="middle" sx={styles.dividerStyle} />
        <Box sx={styles.rowInputElementsWrapper}>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your password
          </Typography>
          <TextField
          fullWidth 
            size="small"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorPassMessage.length > 0}
            helperText={errorPassMessage}
            id="password"
            type = "password"
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
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Confirm your password
          </Typography>
          <TextField
          fullWidth 
            size="small"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorPassConfirmationMessage.length > 0}
            helperText={errorPassConfirmationMessage}
            id="confirmPassword"
            type = "password"
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
        </Box>
        <Divider variant="middle" sx={styles.dividerStyle} />
        <Box sx={styles.rowInputElementsWrapper}>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your phone number 
          </Typography>
          <TextField
          fullWidth 
            size="small"
            value={data.telephone}
            onChange={(e) => setData({ ...data, telephone: e.target.value })}
            sx={styles.textFieldStyle}
            error={errorTelephoneMessage.length > 0}
            helperText={errorTelephoneMessage}
            id="telephone"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styles.inputBoxWrapperStyle}>
          <Typography variant="subtitle1" gutterBottom>
            Your working unit 
          </Typography>
          <FormControl fullWidth>
          <Select
            size="small"
            defaultValue={""}
            id="workingUnitName"
            onChange={(e) => setData({ ...data, workingUnitName: e.target.value })}
          >
          <MenuItem value={"Nis Office"}>Nis</MenuItem>
          <MenuItem value={"Beograd Office"}>Beograd</MenuItem>
          <MenuItem value={"Kragujevac Office"}>Kragujevac</MenuItem>
          </Select>
          </FormControl>  
        </Box>
        </Box>
        <Box sx={{marginTop:'2%', display: 'flex', justifyContent: 'center'}}>
        {spinner && <CircularProgress size = {30}/>}
        {success.length > 0 && <Typography sx={{color:"success.main"}}> {success} </Typography> }
        {error.length > 0 && <Typography sx={{color:"error.main"}}> {error} </Typography> }
        </Box>
        <Box sx={styles.signUpButtonWrapper}>
        <Button
          sx={styles.signUpButtonStyle}
          variant="contained"
          onClick={() => handleRegistration()}
        >
          Sign up!
        </Button>
        </Box>
      </Paper>
      </Fade>
 
    );
}
 
export default Register;