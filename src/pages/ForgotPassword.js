import React, { useRef } from 'react';
import { useAuthContext } from '../Auth/AuthContext';
import { validateEmail } from "../utils/helper"
import { Link } from 'react-router-dom';
import ErrorModal from "../components/modals/ErrorModal"
import { usePostContext } from "../context/post_context"

const ForgotPassword = () => {
    const emailRef = useRef()
    const [emailValidated, setEmailValidated] = React.useState(false)
    const [emailInput, setEmailInput] = React.useState("")

    const { forgotPassword } = useAuthContext()
    const { isErrorModalOpen } = usePostContext()

    const forgotPasswordHandler = _ => {
        const email = emailRef.current.value;
        if(email) forgotPassword(email).then(() => emailRef.current.value = "")
    }


    React.useEffect(() => {
        if(validateEmail(emailInput)) {
            setEmailValidated(true)
        } else {
            setEmailValidated(false)
        }
    }, [emailInput])


  return (
    <>
        { isErrorModalOpen ? <ErrorModal/> : "" }
        <div className="center-transform">
            <div className="login__container">
                <div className="login__main-content">
                    <h1 className="login__heading">Forgot Your password?</h1>
                    <p className="login__text-pass">Enter your email and we'll send you a link to get back your account.</p>
                    <form className="login__form" onSubmit={forgotPasswordHandler}>
                        <input className="form__input" type="email" required ref={emailRef} placeholder="Email" onChange={e => setEmailInput(e.target.value)}/>
                        <button className={emailValidated ? "form-login-btn form-login-btn-validated" : "form-login-btn"}>
                            <Link to="/EmailSentConfirmation">
                                Send Login Link
                            </Link>
                            </button>
                    </form>
                </div>
                <div className="login__component">
                    <p className="component__text">Have have an account? <Link className="component__text__link" to="/">Log in</Link></p>
                </div>
                <div className="login__component">
                    <p className="component__text">Just curious? <Link className="component__text__link" to="/">Try a demo account</Link></p>
                </div>
            </div>
        </div>
    </>
)
};

export default ForgotPassword;
