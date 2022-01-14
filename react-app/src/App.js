import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SplashPage from './components/Splash/SplashPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
