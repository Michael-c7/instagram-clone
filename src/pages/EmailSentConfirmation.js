import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom';
import ErrorModal from "../components/modals/ErrorModal"
import { usePostContext } from "../context/post_context"


const EmailSentConfirmation = () => {
  const { isErrorModalOpen } = usePostContext()

  return (
      <Wrapper>
      { isErrorModalOpen ? <ErrorModal/> : "" }
        <div className="center-transform">
            <div className="login__container">
                <div className="login__main-content">
                    <h1 className="login__heading email-confirm__header">Email Sent</h1>
                    <p className="login__text-pass email-confirm__message">We sent you an email to get back into your account.</p>
                    <Link className="component__text__link email-confirm__close-link" to="/">Ok</Link>
                </div>
            </div>
        </div>
      </Wrapper>
  )
}

export default EmailSentConfirmation

const Wrapper = styled.div`
    .email-confirm__header {
        font-size:1.15rem;
        font-weight:500;
        color:#000;
    }

    .email-confirm__message {
        color:#666;
    }

    .email-confirm__close-link {
        font-weight:500;
    }
`