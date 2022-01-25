import React from 'react';

const Login = () => {
  return (
      <div className="login__container">
        <div className="login__main-content">
            <h1 className="login__heading">Login</h1>
            <form className="login__form">
                <input className="form__input" type="text" placeholder="Email"/>
                <input className="form__input" type="text" placeholder="Password"/>
                <button className="form-login-btn">Log In</button>
            </form>
            <div className="login__divider">
                <div className="divider__line">1px line</div>
                <div className="divider__text">or</div>
                <div className="divider__line">1px line</div>
            </div>
            <a href="/">Log in in with Facebook</a>
            <a href="/">Forgot password?</a>
        </div>
        <div className="login__component">
            <p className="component__text">Don't have an account? <a className="component__text__link" href="/">Sign up</a></p>
        </div>
        <div className="login__component">
            <p className="component__text">Just curious? <a className="component__text__link" href="/">Try a demo account</a></p>
        </div>
      </div>
  )
};

export default Login;