import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpInstance from "../axios/axiosConfig";
import backgroundImg from "../assets/images/login-backgroud.jpg";
import logoImg from "../assets/images/NFA-logo.png";
import { ToastContainer } from "react-toastify";
import { successToast, errorToast } from "../utils/constants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(null);
  
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("_nfa_token");
    if (token) {
      navigate("/dashboard");
    }
  };

  const handleSubmit = () => {
    const payload = {
      email,
    };

    getotp(payload);
  };

  const getotp = async (payload) => {
    try {
      const getotp = await httpInstance.post("/api/forgotpassword", payload);
      if (getotp.data.code === 200) {
        setSuccessMsg(getotp.data.message);
        setTimeout(() => {
          successToast(getotp.data.message);
        }, 1);
      } else {
        console.log(getotp);
        setSuccessMsg(null);
        errorToast(getotp.data.message);
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors);
    }
  };

  const handleHideError = (field) => {
    const newErrors = {...errors};
    delete newErrors[field];
    setErrors(newErrors);
  }

  return (
    <div className="wrapper">
      <section
        className="login_section"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div className="login_form_wrapper signup-wrapper">
          <div className="form_logo_item">
            <Link to="/">
              <img src={logoImg} alt="NFA Claims" />
            </Link>
            <p className="register-text">Forgot Password</p>
          </div>
          <form
              className="login_form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-field">
                <label htmlFor="email">Enter Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onFocus={()=>{handleHideError('email')}}
                />
                {errors.email ? (
                  <div className="form-error">{errors.email[0]}</div>
                ) : null}
                {(successMsg) ? (
                  <div className="form-success">{successMsg}</div>
                ) : null}
              </div>
              <div className="log_btn">
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>

          <div className="reset_password_link">
            Click <Link to="/login">Here</Link> to Login.
          </div>
        </div>
        <p className="login_bot_text">
        If you need help, please contact Lisa Browning at 
                <Link to="mailto:lisa_browning@comcast.net"> lisa_browning@comcast.net</Link>   
        </p>
        <p className="Login_bottom_privacyPolicy"><Link to="https://nationalfloorcoveringalliance.com/terms-and-conditions/" target="_blank">Terms & conditions</Link> <Link to="https://nationalfloorcoveringalliance.com/privacy-policy/" target="_blank">Privacy Policy</Link></p>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
