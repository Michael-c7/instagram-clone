import React from 'react';

const SignUp = () => {
  return (
    <div className="center-transform">
      <div className="login__container">
          <div className="login__main-content">
              <h1 className="login__heading">Sign Up</h1>
              <form className="login__form">
                  <input className="form__input" type="text" placeholder="Username"/>
                  <input className="form__input" type="email" placeholder="Email"/>
                  <input className="form__input" type="password" placeholder="Password"/>
                  <button className="form-login-btn ">Sign Up</button>
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
