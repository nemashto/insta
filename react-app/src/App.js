import React, { useEffect, useState,  useRef}  from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import SignUpForm from './components/auth/SignUpForm';
import Footer from './components/Footer/footer';
import SplashPage from './components/Splash/SplashPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Header } from './components/Header/Header';
import { authenticate } from "./store/authSession"

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const componentMounted = useRef(true);

  useEffect(() => {
      (async() => {
          await(dispatch(authenticate()))
          setLoaded(true)
      })()
      return(
          componentMounted.current = false
      )
  }, [dispatch])

  if (!loaded) {
    return (
      <div className="container">
        <p>loading...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
