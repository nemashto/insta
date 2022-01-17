import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpForm from './components/auth/SignUpForm';
import Footer from './components/Footer/footer';
import SplashPage from './components/Splash/SplashPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/signup' exact={true} >
          <SignUpForm />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
