import React from 'react';

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
                <a className="login__link" href="/">Forgot password?</a>
            </div>
            <div className="login__component">
                <p className="component__text">Don't have an account? <a className="component__text__link" href="/">Sign up</a></p>
            </div>
            <div className="login__component">
                <p className="component__text">Just curious? <a className="component__text__link" href="/">Try a demo account</a></p>
            </div>
        </div>
      </div>
  )
};

export default Login;