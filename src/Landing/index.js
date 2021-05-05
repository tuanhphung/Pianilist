import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import "./Landing.css";

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
  };
};

const Landing = (props) => {
  const theme = props.darkMode ? "dark" : "light";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='landing'
    >
      <h1 className='main-title'>Piano Sheets In One Place</h1>
      Add piano sheets you want to learn from anywhere
      <div className={`landing__get-started--${props.darkMode ? "dark" : "light"}`}>
        <NavLink to='/sheets'>Get Started</NavLink>
      </div>
    </motion.div>
  );
};

export default connect(mapStateToProps)(Landing);
