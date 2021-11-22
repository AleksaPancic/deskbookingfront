
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Register from './components/register/Register';
import AppHeaderMenu from './components/AppHeaderMenu/AppHeaderMenu';
import Home from './components/Home/Home';
import Booking from './components/Booking/Booking';
import Users from './components/Users/Users';
import UserProvider from './UserContext'
import UserProfile from './components/UserProfile/UserProfile';



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
      <Route exact path="/booking" component={Booking}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path="/profile" component={UserProfile}/>
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
