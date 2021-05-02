import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import sheetsIcon from "../assets/sheet-music.svg";
import Card from "../reusable/Card";

const mapStateToProps = (state) => {
  return {
    sheets: state.sheets,
    filter: state.currentFilter,
  };
};

const PriceSheets = (props) => {
  // filter records from database based on price.
  const renderFiltered = () => {
    const filtered = props.sheets.filter((sheet) => {
      return sheet.price == props.filter;
    });
    return filtered.map((piece) => {
      //piano piece for 'paid' and 'free' have defined css class
      let priceClass = piece.price == "free" ? "free" : "paid";
      return (
        <Card
          title={piece.title}
          artist={piece.artist}
          videoId={piece.videoId}
          link={piece.link}
          class={priceClass}
          price={piece.price}
          tags={piece.tags}
        />
      );
    });
  };
  return (
    <motion.div
      className='piano-sheets'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <span className='main-title'>
        {props.filter == "free" ? "Free" : "Paid"} Sheets
      </span>

      <div className='piano-sheets__all icon'>
        <NavLink to='/sheets'>
          <img src={sheetsIcon} />
        </NavLink>
        All
      </div>
      <div className='piano-sheets__list'>{renderFiltered()}</div>
    </motion.div>
  );
};

export default connect(mapStateToProps)(PriceSheets);
