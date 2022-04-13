import React, { useRef } from 'react';
import { useAuthContext } from "../Auth/AuthContext"
import { Link } from "react-router-dom";
import ErrorModal from "../components/modals/ErrorModal"
import { usePostContext } from "../context/post_context"

const Login = () => {
    const { isErrorModalOpen } = usePostContext()
    const { signInUser } = useAuthContext()
    const emailRef = useRef()
    const passwordRef = useRef() 

    const onSubmit = e => {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(email && password) signInUser(email, password)
    } 
  return (
    <>
        { isErrorModalOpen ? <ErrorModal/> : "" }
        <div className="center-transform">
            <div className="login__container">
                <div className="login__main-content">
                    <h1 className="login__heading">Log In</h1>
                    <form className="login__form" onSubmit={onSubmit}>
                        <input className="form__input" type="email" required ref={emailRef} placeholder="Email"/>
                        <input className="form__input" type="password" required ref={passwordRef} placeholder="Password"/>
                        <button className="form-login-btn form-login-btn-validated">Log In</button>
                    </form>
                    <Link className="login__link" to="/forgotPassword">Forgot password?</Link>
                </div>
                <div className="login__component">
                    <p className="component__text">Don't have an account?
                        <Link className="component__text__link" to="/signUp"> Sign up</Link>
                    </p>
                </div>
                <div className="login__component">
                    <p className="component__text">Just curious? 
                        <Link className="component__text__link" to="/"> Try a demo account</Link>
                    </p>
                </div>
            </div>
      </div>
    </>
  )
};

export default Login;