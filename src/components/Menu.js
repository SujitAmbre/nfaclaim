import React from "react";
import { Link } from "react-router-dom";
const Menu = ({currentMenu}) => {
    const menuOnClick = () => {
        document.getElementById("menucheckbox").checked = false;
      }

    return(
        <nav role='navigation'>
              <div id="menuToggle">
                <input type="checkbox" id="menucheckbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                    {
                        currentMenu.length > 0 &&
                        currentMenu.map((item) => {
                            return <li onClick={menuOnClick} key={item.menu_id}><Link to={item.menu_link}>{item.menu_label}</Link></li>
                        })
                    }
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
              </div>
            </nav>
    );
};

export default Menu;