import React, { lazy, useState, useEffect,  useRef}  from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import ProtectedRoute from './helpers/ProtectedRoute';
import { authenticate } from "./store/authSession"
import { UsersList } from "./components/Users/UsersList";
import ReactLoader from "./components/loader";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";


function App() {
  const dispatch = useDispatch()
  const componentMounted = useRef(true);
  const [loaded, setLoaded] = useState(false)
  const user = useSelector(state => state.session.user)


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
    return (<ReactLoader />);
  }

  return (
    <Router>
      <Switch>
        <Route path={'/login'} component={Login} />
        <Route path={'/signup'} component={SignUp} />
        <ProtectedRoute user={user} path={'/'} exact>
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
