import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    sheets: state.sheets,
    filter: state.currentFilter,
  };
};

const PriceSheets = (props) => {
  //filter records on database based on tag

  return (
    <div className='piano-sheets'>
      <h1 className='main-title'>{props.filter} Sheets</h1>
      <div className='piano-sheets__list'></div>
    </div>
  );
};

export default connect(mapStateToProps)(PriceSheets);
