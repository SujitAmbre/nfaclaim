import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpInstance from "../axios/axiosConfig";
import nfaLogo from '../assets/images/NFA-logo.png';
import Menu from "./Menu";
import { menuItems, successToast } from "../utils/constants";
import { resetLocalStorage } from "../utils/helper";


const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('_nfa_token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('_nfa_role'));
  const [currentMenu, setCurrentMenu] = useState(menuItems.retailer);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('_nfa_userInfo')));
  const handleSignout = () => {
    signOutUser();
  }

  const signOutUser = async () => {
    const getToken = localStorage.getItem('_nfa_token');
    const config = {
      headers: {
        Authorization: `Bearer ${getToken}`,
      }
    }
    
    try {
      const signout = await httpInstance.post('/api/logout', {}, config);
      if (signout.data.status) {
        resetLocalStorage();
        navigate('/login');
        setTimeout(() =>{
          successToast('You have successfully logged out.');
        }, 1);
      } else {
        console.log(signout.data);
      }
    } catch (error) {
      resetLocalStorage();
      navigate('/login');
      console.log(error?.response?.data?.message);
    }

  }

  const checkUserLoggedIn = () => {
    const userMenu = (menuItems[userRole]) ? menuItems[userRole] : [];
    setCurrentMenu(userMenu);
    if (!token) {
      navigate('/');
    }
  }

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <header className="site_header_wrap sticky-top">
      <nav className="navbar align-items-center justify-content-between">
        <Link className="navbar-brand" to="/dashboard">
          <img src={nfaLogo} alt="NFA Claims" />
        </Link>
        <div className="header-right-part">
          <p className="right_top_para">
            Welcome, <span>{(userInfo && userInfo.name) ? userInfo.name : ""}</span> (<Link to="#" onClick={handleSignout}>SIGN OUT</Link>)
          </p>
          <div className="d-flex">
            <button type="button" className="btn btn-danger main_btn">
              <Link className="anchor-no-decoration" to={'/dashboard'}>
              VIEW CURRENT CLAIMS
              </Link>
            </button>
            <Menu currentMenu={currentMenu}/>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;