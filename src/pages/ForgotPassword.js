import React, { useRef } from 'react';
import { useAuthContext } from '../Auth/AuthContext';


const ForgotPassword = () => {
    const emailRef = useRef()

    const { forgotPassword } = useAuthContext()

    const forgotPasswordHandler = _ => {
        const email = emailRef.current.value;
        if(email) forgotPassword(email).then(() => emailRef.current.value = "")
    }

  return (
    <div className="center-transform">
      <div className="login__container">
          <div className="login__main-content">
              <h1 className="login__heading">Forgot Your password?</h1>
              <p className="login__text-pass">Enter your email and we'll send you a link to get back your account.</p>
              <form className="login__form" onSubmit={forgotPasswordHandler}>
                  <input className="form__input" type="email" required ref={emailRef} placeholder="Email"/>
                  <button className="form-login-btn ">Send Login Link</button>
              </form>
          </div>
          <div className="login__component">
              <p className="component__text">Have have an account? <a className="component__text__link" href="/">Log in</a></p>
          </div>
          <div className="login__component">
              <p className="component__text">Just curious? <a className="component__text__link" href="/">Try a demo account</a></p>
          </div>
      </div>
    </div>
)
};

export default ForgotPassword;
