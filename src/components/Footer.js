import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Footer = () => {
    return (
        <>
         <hr />
            <div className="bottomTextMainPg">
              
              <p className="bottom_contact">
              If you need help, please contact Lisa Browning at 
                <Link to="mailto:lisa_browning@comcast.net"> lisa_browning@comcast.net</Link>               
              </p>
              <p className="bottom_privacyPolicy"><Link to="https://nationalfloorcoveringalliance.com/terms-and-conditions/" target="_blank">Terms & conditions</Link> <Link to="https://nationalfloorcoveringalliance.com/privacy-policy/" target="_blank">Privacy Policy</Link></p>
            </div>
            <ToastContainer />   
        </>
    );
}

export default Footer;