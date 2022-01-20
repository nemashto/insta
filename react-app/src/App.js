import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpForm from './components/auth/SignUpForm';
import Footer from './components/Footer/footer';
import SplashPage from './components/Splash/SplashPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Header } from './components/Header/Header';

function App() {
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
