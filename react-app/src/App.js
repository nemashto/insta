import React, { useState, useEffect,  useRef}  from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import ProtectedRoute from './helpers/ProtectedRoute';
import { authenticateAction} from './state/authSlice'
import ReactLoader from "./components/loader";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";


function App() {
  const dispatch = useDispatch()
  const componentMounted = useRef(true);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
      (async() => {
          await(dispatch(authenticateAction()))
          setLoaded(true)
      })()
      return(
          componentMounted.current = false
      )
  }, [dispatch])

  if (!loaded) {
    return (<ReactLoader />);
  }

  return (
    <Router>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/signup'} component={SignUp} />
        <Route path={'/p/:username'} component={Profile} />
        <ProtectedRoute path={'/'} exact>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path={'/newPost'} exact>
          <NewPost />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
