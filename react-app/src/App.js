import React, { lazy, Suspense, useEffect,  useRef}  from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import SignUpForm from './components/auth/SignUpForm';
import Footer from './components/Footer/footer';
import SplashPage from './components/Splash/SplashPage';
import ProtectedRoute from './helpers/ProtectedRoute';
import { authenticate } from "./store/authSession"
import { UsersList } from "./components/Users/UsersList";
import ReactLoader from "./components/loader";


const Dashboard = lazy(() => import('./pages/dashboard'));


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
      <Suspense fallback={<ReactLoader />}>
        <Switch>
          <Dashboard />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
