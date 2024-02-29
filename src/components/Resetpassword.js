import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import httpInstance from "../axios/axiosConfig";
import backgroundImg from "../assets/images/login-backgroud.jpg";
import logoImg from "../assets/images/NFA-logo.png";
import { ToastContainer } from "react-toastify";
import { successToast, errorToast } from "../utils/constants";

const Resetpassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [ui, setUi] = useState(null);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm_password, setCPassword] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    isUserLoggedIn();
    if(searchParams.get('token')) {
      setOtp(searchParams.get('token'));
    }
    if(searchParams.get('ui')) {
      setUi(searchParams.get('ui'));
    }
  }, []);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("_nfa_token");
    if (token) {
      navigate("/dashboard");
    }
  };

 

  const handleResetpassword = () => {
    const payload = {
      ui,
      otp,
      password,
      confirm_password,
    };

    resetPassword(payload);
  };

  const resetPassword = async (payload) => {
    try {
      const resetdata = await httpInstance.post("/api/resetpassword", payload);
      if (resetdata.data.code === 200) {
        setSuccessMsg(resetdata.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        
        setTimeout(() => {
          successToast(resetdata.data.message);
        }, 1);
      } else {
        setSuccessMsg(null);
        errorToast(resetdata.data.message);
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
            <p className="register-text">Reset Password</p>
          </div>
          <form
              className="login_form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-field">
                <label htmlFor="password">Enter New Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onFocus={()=>{handleHideError('password')}}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {errors.password ? (
                  <div className="form-error">{errors.password[0]}</div>
                ) : null}
              </div>
              <div className="form-field">
                <label htmlFor="confirm_password">Confirm password </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  onFocus={()=>{handleHideError('confirm_password')}}
                  onChange={(e) => {
                    setCPassword(e.target.value);
                  }}
                />
                {errors.confirm_password ? (
                  <div className="form-error">{errors.confirm_password[0]}</div>
                ) : null}
                {errors.otp ? (
                  <div className="form-error">{errors.otp[0]}</div>
                ) : null}
                {successMsg 
                  ? <div className="form-success">{successMsg}</div>
                  : null
                }
              </div>
              <div className="log_btn">
                <button type="submit" onClick={handleResetpassword}>
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

export default Resetpassword;
