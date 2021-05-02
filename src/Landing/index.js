import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Landing.css";

const Landing = () => {
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
      <div className='landing__get-started'>
        <NavLink to='/sheets'>Get Started</NavLink>
      </div>
    </motion.div>
  );
};

export default Landing;
