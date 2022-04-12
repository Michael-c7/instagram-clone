import React from 'react'
import styled from "styled-components"
import { usePostContext } from "../../context/post_context"


const ErrorModal = () => {
  const { 
    isErrorModalOpen,
    errorModalMessage,
    openErrorModal,
    closeErrorModal,
   } = usePostContext()


   

  return (
    <Wrapper>
      <div className={isErrorModalOpen ? "error-modal-container modal-container--open" : "error-modal-container"}>
        <section className="error-modal">
         <div  className="error-modal__content">
          <h2 className="error-modal__heading">Error</h2>
            <p className="error-modal__message">
              {errorModalMessage ? errorModalMessage : "An error has occurred."}
            </p>
         </div>
          <hr className="error-modal__hr"/>
          <button className="error-modal__close-btn" onClick={closeErrorModal}>Dismiss</button>
        </section>
      </div>
    </Wrapper>
  )
}




export default ErrorModal

/*
errors msg vars that will be global isErrorModalOpen, errorMessage
- when an error occurs set isErrorModalOpen to true AND
set errorMessage var to whatever the error message is

- show the error modal if an error has occurred
*/


// have the wrapper be the error-modal-container
const Wrapper = styled.div`
.error-modal-container {
    position:absolute;
    top:0;
    left:0;
    background:rgba(50,50,50,0.5);
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;

    z-index:-9999;
    visibility:hidden;
    display:none;
  }

  .modal-container--open {
    visibility: visible;
    z-index:999;
    display:flex;
  }



  .error-modal {
    background:#fff;
    position:absolute;
    border-radius:10px;
    padding:0rem 0 0rem 0;
    width:20rem;
  }

  .error-modal__content {
    margin:1rem 0;
  }

  .error-modal__heading {
    font-size:1.35rem;
    font-weight:500;
  }

  .error-modal__message {
    font-size:1rem;
    color:#222;
  }

  .error-modal__hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin:0rem 0;
    padding:0;
  }

  .error-modal__close-btn {
    background:none;
    border:none;
    font-size:1rem;
    font-weight:700;
    color:var(--login-btn-bg-validated);
    cursor:pointer;
    margin:1rem 0;
  }
`