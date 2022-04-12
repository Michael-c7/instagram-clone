import React from 'react'
import styled from "styled-components"
// images
// import CameraIcon from "../../utils/images/camera-solid.svg"
import CameraIcon from "../../utils/images/camera-img.png"


const LoadingPage = () => {
  return (
    <Wrapper>
        <img className="LoadingPage__CameraIcon center-transform" src={CameraIcon} alt="icon shown when the page is loading"/>
    </Wrapper>
  )
}

export default LoadingPage

const Wrapper = styled.div`

@-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    
  }
  
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }


    .LoadingPage__CameraIcon {
        width:3.5rem;
        filter:contrast(60%);

        // -webkit-animation-name: spin;
        // -webkit-animation-duration: 1s;
        // -webkit-animation-iteration-count: infinite;
        // animation-name: spin;
        // animation-duration: 1s;
        // animation-iteration-count: infinite;
        
        // -webkit-animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
        // animation-timing-function: cubic-bezier(0.6, 0, 0.4, 1);
    }
`