import styled from "styled-components"
// logged in pages
import Dashboard from "./pages/Dashboard"
// logged out pages
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import SignUp from "./pages/SignUp"
import EmailSentConfirmation from "./pages/EmailSentConfirmation"
// both logged in and logged out
import Profile from "./pages/Profile"
import Post from "./components/Post"
import SinglePost from "./pages/SinglePost"
// other pages
import Error from "./pages/Error";
import LoadingPage from "./components/loaders/LoadingPage"


// other stuff
import { useAuthContext } from "./Auth/AuthContext"

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



function App() {
  const { isLoggedIn } = useAuthContext();

  /*
  LOADING_VAR exists as a way to show a loading screen
  before the authentication is done.
  - should always remain true
  */
  const LOADING_VAR = true;

  if(LOADING_VAR && isLoggedIn) {
    return (
      <LoadingPage/>
    )
  } 
  

  if(isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:id" element={<Profile />}/>
          <Route path="/p/:id" element={<SinglePost />}/>
          <Route path="/signUp" element={<Navigate to="/" />} />
          <Route path="/forgotPassword" element={<Navigate to="/" />} />
          <Route path="/EmailSentConfirmation" element={<Navigate to="/"/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
    </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/EmailSentConfirmation" element={<EmailSentConfirmation />}/>
          <Route path="/:id" element={<Profile />}/>
          <Route path="/p/:id" element={<SinglePost />}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;


