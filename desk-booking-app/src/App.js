
import './App.css';
import Login from './components/login/Login';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Register from './components/register/Register';
import AppHeaderMenu from './components/AppHeaderMenu/AppHeaderMenu';
import Home from './components/Home/Home';
import Booking from './components/Booking/Booking';
import Users from './components/Users/Users';
import UserProfile from './components/UserProfile/UserProfile';
import Office from './components/Office/Office';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Analytics from './components/Analytics/Analytics';
import Parking from './components/Parking/Parking';


const Lato = "'Lato', sans-serif";

const theme = createTheme({
  palette: {
    background: {
      default: '#D2D7D9',
      paper: 'white'
    },
    primary: {
      main: "#279cce",
      contrastText: '#fff',
      backgroudColor: 'rgb(242, 245, 249)'
    },
    secondary: {
      main: '#384ED5',
      contrastText: '#fff',
    },
    error: {
      main: "#FF5026",
      contrastText: '#fff',
    },
    warning: {
      main: '#FFC226',
      contrastText: '#fff',

    },
    success: {
      main: '#21DA6C',
      contrastText: '#fff',
    }
  },
  typography: {
    fontFamily: Lato,
  }, 
});


function App() {

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
      const token = sessionStorage.getItem('token');
      setIsAuth(token);

  },[isAuth])


  const logIn = (data) => {
    setIsAuth(data);
  }

  const appContent = () => {
    return (
      <Switch>
      <Route exact path="/" component={Home}/> 
      <Route exact path="/booking/:city" component={Booking}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path="/profile" component={UserProfile}/>
      <Route exact path="/analytics" component={Analytics}/>
      <Route exact path="/booking/:city/:office" component={Office}/>
      <Route exact path="/parking/:city" component={Parking}/>
      <Redirect to="/" /> 
     </Switch>
    );
  }

  const isAuthenticated = () => {
    if(isAuth){
      return (
        <div className="App">
            <AppHeaderMenu
              contentComponents={appContent()}
              logOut={() => {
                sessionStorage.removeItem("refresh_token");
                sessionStorage.removeItem("token");
                setIsAuth(undefined);
              }}
            />
        </div>
      );
    }
    else {
      return(
        <div className="non-auth-background">
        <Switch>
        <Route path="/reset">
            <ResetPassword/>
          </Route>
          <Route path="/login" >
            <Login logIn = {(token) => logIn(token)}/>
          </Route>
          <Route path="/register" >
            <Register/>
          </Route>
          <Redirect to="/login" />
        </Switch>
        </div>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Router>
     {isAuthenticated()}
    </Router>
    </ThemeProvider>
   
  );
}
export default App;
