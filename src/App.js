import styled from "styled-components"
import WelcomeSection from "./pages/WelcomeSection"
import Dashboard from "./pages/Dashboard"


function App() {
  let isLoggedIn = false;
  if(isLoggedIn) {
    return <Dashboard/>
  } else {
    return <WelcomeSection/>
  }
}

export default App;


