import React from 'react';
import { Link } from "react-router-dom";
import ErrorModal from "../components/modals/ErrorModal"
import { usePostContext } from "../context/post_context"


const Error = () => {
  const { isErrorModalOpen } = usePostContext()

  return (
      <>
        { isErrorModalOpen ? <ErrorModal/> : "" }
        <section className="center-transform login__container login__main-content">
          <h1>Error</h1>
          <h2 className="login__heading">Page not found</h2>
          <button className="form-login-btn form-login-btn-validated">
              <Link to="/">Go Home</Link>
          </button>
        </section>
      </>
  )
}

export default Error;
