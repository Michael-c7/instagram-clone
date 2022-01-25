import styled from "styled-components"
import StartingPage from "./pages/StartingPage"
import Dashboard from "./pages/Dashboard"


function App() {
  let isLoggedIn = false;
  if(isLoggedIn) {
    return <Dashboard/>
  } else {
    return <StartingPage/>
  }
}

export default App;


