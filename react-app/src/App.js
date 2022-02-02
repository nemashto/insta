import React, { useState, useEffect,  useRef}  from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
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

  const user = useSelector(state => state.auth.user)

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
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/p/:username'} element={<Profile />} />
        <Route 
          path={'/'}
          exact
          element={
            <RequireAuth redirectTo={'/login'} user={user}>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route 
          path={'/newPost'} 
          exact 
          element={
            <RequireAuth redirectTo={'/login'} user={user}>
              <NewPost />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

function RequireAuth({ children, redirectTo, user }) {
  return user ? children : <Navigate replace to={redirectTo}/>;
}

export default App;
