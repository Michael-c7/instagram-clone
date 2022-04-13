import React from 'react';
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
  loadingVar exists as a way to show a loading screen
  before the authentication of logging in the user is done.
  */
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])


  if(!loading && isLoggedIn) {
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
  } else if(!loading && !isLoggedIn) {
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
  } else {
    return <LoadingPage/>
  }
}

export default App;