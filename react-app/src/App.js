import React, { useEffect,  useRef}  from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import SignUpForm from './components/auth/SignUpForm';
import Footer from './components/Footer/footer';
import SplashPage from './components/Splash/SplashPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Header } from './components/Header/Header';
import { authenticate } from "./store/authSession"
import { UsersList } from "./components/Users/UsersList";

function App() {
  const dispatch = useDispatch()
  const componentMounted = useRef(true);


  useEffect(() => {
      (async() => {
          await(dispatch(authenticate()))
      })()
      return(
          componentMounted.current = false
      )
  }, [dispatch])


  return (
    <Router>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
          <Footer />
        </Route>
        <Route path='/signup' exact={true} >
          <SignUpForm />
          <Footer />
        </Route>
        <ProtectedRoute path='/feed' exact={true} >
          <Header />
          
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <Header />
          <UsersList />
          <Footer />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
