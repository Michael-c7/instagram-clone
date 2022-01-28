import styled from "styled-components"
// logged in pages
import Dashboard from "./pages/Dashboard"
// logged out pages
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import SignUp from "./pages/SignUp"
// both logged in and logged out
import Profile from "./pages/Profile"
// other pages
import Error from "./pages/Error";



import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  let isLoggedIn = false;
  

  if(isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:id" element={<Profile />}/>
          <Route path="/signUp" element={<Navigate to="/" />} />
          <Route path="/forgotPassword" element={<Navigate to="/" />} />
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
          <Route path="/:id" element={<Profile />}/>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;


