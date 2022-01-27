import React from 'react';

import { Link } from "react-router-dom";


const Login = () => {
  return (
      <div className="center-transform">
        <div className="login__container">
            <div className="login__main-content">
                <h1 className="login__heading">Log In</h1>
                <form className="login__form">
                    <input className="form__input" type="email" placeholder="Email"/>
                    <input className="form__input" type="password" placeholder="Password"/>
                    <button className="form-login-btn ">Log In</button>
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
  )
};

export default Login;