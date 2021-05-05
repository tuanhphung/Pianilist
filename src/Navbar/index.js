import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { toggleTheme } from "../utils/actions";
import adjustIcon from "../assets/adjust.svg";
import adjust_whiteIcon from "../assets/adjust_white.svg";

import "./Navbar.css";

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
  };
};

const Navbar = (props) => {
  // checks for dark or light theme.
  useEffect(() => {
    let theme = props.darkMode === true ? "dark" : "light";
    if (theme === "dark") {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else if (theme === "light") {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [props.darkMode]);

  return (
    <nav className='navbar'>
      <NavLink to='/'>Pianilist</NavLink>
      <img
        className='navbar_toggle-theme'
        src={props.darkMode ? adjust_whiteIcon : adjustIcon}
        onClick={() => props.toggleTheme(props.darkMode)}
      />
    </nav>
  );
};

export default connect(mapStateToProps, { toggleTheme })(Navbar);
