import React from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthListener } from './hooks/auth';
import { UserContext } from "./context/user";
import { RequireAuth } from "./helper/requireAuth";
import ReactLoader from "./components/loader";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";


function App() {
  const {user, loader} = useAuthListener()

  if (loader) {
    return(
      <ReactLoader />
    )
  }
  return (
    <UserContext.Provider value={{user}} >
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
    </UserContext.Provider>
  );
}

export default App;
