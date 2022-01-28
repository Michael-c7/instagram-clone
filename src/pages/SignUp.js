import React, { useRef } from 'react';
import { useAuthContext } from "../Auth/AuthContext"




const SignUp = () => {
    const {testFunc, registerUser} = useAuthContext()

    const userNameRef = useRef() 
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const onSubmit = e => {
        e.preventDefault()
        const userName = userNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(userName && email && password) {
            registerUser(userName, email, password)
        }
    }


    return (
        <div className="center-transform">
          <div className="login__container">
              <div className="login__main-content">
                  <h1 className="login__heading">Sign Up</h1>
                  <form className="login__form" onSubmit={onSubmit}>
                      <input className="form__input" type="text" ref={userNameRef} placeholder="Username"/>
                      <input className="form__input" type="email" ref={emailRef} placeholder="Email"/>
                      <input className="form__input" type="password" ref={passwordRef} placeholder="Password"/>
                      <button className="form-login-btn form-login-btn-validated" type="submit">Sign Up</button>
                  </form>
              </div>
              <div className="login__component">
                  <p className="component__text">Have an account? <a className="component__text__link" href="/">Log in</a></p>
              </div>
              <div className="login__component">
                  <p className="component__text">Just curious? <a className="component__text__link" href="/">Try a demo account</a></p>
              </div>
          </div>
        </div>
    )
};

export default SignUp;
