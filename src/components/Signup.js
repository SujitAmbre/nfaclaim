import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpInstance from "../axios/axiosConfig";
import backgroundImg from '../assets/images/login-backgroud.jpg';
import logoImg from '../assets/images/NFA-logo.png';


const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [retailer_name, setRetailerName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('_nfa_token');
    if(token) {
        navigate('/dashboard');
    }
  }

  const handleSignup = () => {
    const payload = {
        firstname,
        lastname,
        retailer_name,
        email,
        password,
        role: "retailer"
    };

    signupUser(payload);
  }

  const signupUser = async(payload) => {
    try {
        const signup = await httpInstance.post('/api/register', payload);
        if(signup.data.status) {
            alert(signup.data.message);
            navigate('/login');
        } else {
            console.log(signup);
        }
    } catch(error) {
        setErrors(error?.response?.data?.errors);
    }
    
  }

 return (
    <div className="wrapper">
      <section className="login_section"
        style={{
            backgroundImage: `url(${backgroundImg})`
        }}
      >
        <div className="login_form_wrapper signup-wrapper">
          <div className="form_logo_item">
            <Link to="/">
              <img src={logoImg} alt="NFA Claims" />
            </Link>
            <p className="register-text">Register for the Claims Portal</p>
          </div>
          <form className="login_form" 
            onSubmit={(e) => { e.preventDefault(); }}>
            <div className="form-field">
              <label htmlFor="email">First Name<span className="requiredMark">*</span></label>
              <input type="text" name="firstname" id="firstname" placeholder="First Name" onChange={(e) => { setFirstName(e.target.value) }} />
              {errors.firstname ? <div className="form-error">{errors.firstname[0]}</div> : null}
            </div>
            <div className="form-field">
              <label htmlFor="email">Last Name</label>
              <input type="text" name="lastname" id="lastname" placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
              {errors.lastname ? <div className="form-error">{errors.lastname[0]}</div> : null}
            </div>
            <div className="form-field">
              <label htmlFor="email">Retailer Name</label>
              <input type="text" name="retailer_name" id="retailer_name" placeholder="Retailer Name" onChange={(e) => { setRetailerName(e.target.value) }} />
              {errors.retailer_name ? <div className="form-error">{errors.retailer_name[0]}</div> : null}
            </div>
            <div className="form-field">
              <label htmlFor="email">Enter Email<span className="requiredMark">*</span></label>
              <input type="text" name="email" id="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
              {errors.email ? <div className="form-error">{errors.email[0]}</div> : null}
            </div>
            <div className="form-field">
              <label htmlFor="password">Password<span className="requiredMark">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => { setPassword(e.target.value) }}
              />
              {errors.password ? <div className="form-error">{errors.password[0]}</div> : null}
            </div>
            <div className="log_btn">
              <button type="submit" onClick={handleSignup}>
                Signup
              </button>
            </div>
          </form>
          <div className="reset_password_link">
            Already a user? <Link to="/login">Login</Link>
          </div>
        </div>
        <p className="login_bot_text">
        If you need help, please contact Lisa Browning at 
                <Link to="mailto:lisa_browning@comcast.net"> lisa_browning@comcast.net</Link>   
        </p>
        <p className="Login_bottom_privacyPolicy"><Link to="https://nationalfloorcoveringalliance.com/terms-and-conditions/" target="_blank">Terms & conditions</Link> <Link to="https://nationalfloorcoveringalliance.com/privacy-policy/" target="_blank">Privacy Policy</Link></p>
      </section>
    </div>
  );
};

export default Signup;
