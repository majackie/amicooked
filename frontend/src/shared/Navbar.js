import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarTipData } from "./SidebarTipData";
import { SidebarData } from "./SidebarData";
import "../style/Navbar.css";
import { IconContext } from "react-icons";
import AppHeader from "./AppHeader";

/**
 * A Navbar component helps with navigations 
 * and to be used for all amicooked pages.
 */
function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="Navbar-container">
        <AppHeader />
        <IconContext.Provider value={{ color: "undefined" }}>
        {/* Hamburger menu */}
        <div className="Navbar">
            <Link to="#" className="Menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            </Link>
        </div>
        <nav className={sidebar ? "Nav-menu active" : "Nav-menu"}>
            <ul className="Nav-menu-items" onClick={showSidebar}>
            
                <li className="Navbar-toggle">
                    <Link to="#" className="Menu-bars">
                    <AiIcons.AiOutlineClose />
                    </Link>
                </li>
                {/* Switch sidebar navigation based on type */}
                {(props.type === "default" ? SidebarData : SidebarTipData).map((item, index) => {
                    return (
                    // Dynamically rendering each data as a link
                    <li key={index} className={item.cName} style={{display: item.display}}>
                        <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                        </Link>
                    </li>
                    );
                })}
            </ul>
        </nav>
        </IconContext.Provider>
    </div>
  );
}

export default Navbar;