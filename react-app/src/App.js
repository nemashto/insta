import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from "./context/userContext";
import ReactLoader from "./components/loader";
import { RequireAuth} from './helper/requireAuth'
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";
import { useUserContext } from "./hooks/userContext";


function App() {

  const loaded = useUserContext()
  if (loaded) {
    return (
      <ReactLoader />
    )
  }

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/p/:username'} element={<Profile />} />
          <Route 
            path={'/'}
            exact
            element={
              <RequireAuth redirectTo={'/login'}>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route 
            path={'/newPost'} 
            exact 
            element={
              <RequireAuth redirectTo={'/login'}>
                <NewPost />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
