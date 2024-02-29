import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from "../assets/images/login-backgroud.jpg";
import logoImg from "../assets/images/NFA-logo.png";
import { resetLocalStorage } from "../utils/helper";
import httpInstance from "../axios/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { getCurrentYear } from "../utils/helper";

const Login = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loginBtnTxt, setLoginBtnTxt] = useState('Login');
  const [errors, setErrors] = useState({});
  const [lastUrl, setLastUrl] = useState(localStorage.getItem('_nfa_last_url'));
  

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("_nfa_token");
    if (token) {
      if(lastUrl) {
        localStorage.removeItem('_nfa_last_url');
        navigate(lastUrl);
      }
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    getCSRFToken();
  }, []);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  useEffect(() => {
    handleSessionOut();
  }, [lastUrl])

  const getCSRFToken = async () => {
    try {
      const csrf = await httpInstance.get("/sanctum/csrf-cookie");
    } catch(error) {
      console.log(error);
    }
  };

  const handleSessionOut = () => {
    if(lastUrl) {
      toast.error("Your session has been timed out, please login again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleLogin = () => {
    resetLocalStorage();
    loginUser(userName, password);
  };

  const loginUser = async (userName, password) => {
    setLoginBtnTxt('Please wait..');
    try {
      const payload = { email: userName, password: password };

      const authenticate = await httpInstance.post("/api/login", payload);
      
      if (authenticate.data.status) {
        localStorage.setItem("_nfa_token", authenticate.data.token);
        localStorage.setItem("_nfa_role", authenticate.data.role);
        const userInfo = {
          id: authenticate.data.user_info.id,
          name: authenticate.data.user_info.name,
          email: authenticate.data.user_info.email,
          role: authenticate.data.user_info.role,
        };
        localStorage.setItem('_nfa_userInfo', JSON.stringify(userInfo));
        localStorage.getItem('_nfa_token');
        localStorage.getItem('_nfa_role');
        localStorage.getItem('_nfa_userInfo');
        
        if(lastUrl) {
          localStorage.removeItem('_nfa_last_url');
          navigate(lastUrl);
        } else {
          navigate("/dashboard");
        }

        setTimeout(() => {
          toast.success("You have logged in successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 1);
        
      } else {
        setAuthError(authenticate?.data?.message);
      }
    } catch (error) {
      const errs = error?.response?.data?.errors;
      
      if(errs) {
        setErrors(errs);
      } else {
        setAuthError(error.response.data.message);
      }
      
    } finally {
      setLoginBtnTxt('Login');
      setTimeout(() => {
        const getToken = localStorage.getItem('_nfa_token');
        const currentPath = window.location.pathname;
        if(getToken && currentPath === '/login') {
          isUserLoggedIn();
        }
      }, 1000*2);
    }
  };

  return (
    <div className="wrapper">
      <section
        className="login_section"
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div className="login_form_wrapper">
          <div className="form_logo_item">
            <Link to="/">
              <img src={logoImg} alt="NFA Claims" />
            </Link>
          </div>
          <form
            className="login_form"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="form-field">
              <label htmlFor="email">Enter Email<span className="requiredMark">*</span></label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              {errors.email ? <div className="form-error">{errors.email[0]}</div> : null}
            </div>
            <div className="form-field">
              <label htmlFor="password">Password<span className="requiredMark">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password ? <div className="form-error">{errors.password[0]}</div> 
                : authError ? <div className="form-error">{authError}</div> : null }
              
            </div>
            <div className="log_btn">
              <button type="submit" onClick={handleLogin}>
                {loginBtnTxt}
              </button>
            </div>
          </form>
          <div className="reset_password_link">
            <div>Need help logging in? <Link to="/forgotpassword">Forgot password</Link></div>
            <div>Not a user? <Link to="/signup">Signup</Link></div>

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

export default Login;
