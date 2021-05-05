import React, { useEffect } from "react";
import firebase from "../utils/firebase";
import { connect } from "react-redux";
import { addSheet } from "../utils/actions";
import Card from "../reusable/Card";
import addIcon from "../assets/add.svg";
import "./PianoSheets.css";
import { motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    sheets: state.sheets,
  };
};

const PianoSheets = (props) => {
  useEffect(() => {
    //reference table in RT database
    const sheetsRef = firebase.database().ref("Sheets");
    // .on() listens to changes to the database
    sheetsRef.on("value", (snapshot) => {
      const sheets = snapshot.val(); //returns the records of values on table (object);
      const list = [];
      for (let id in sheets) {
        list.push({ id, ...sheets[id] }); //'id' is a unique ID from the database which refers to each record in the loop.
      }
      props.addSheet(list.reverse());
    });
  }, []);

  const renderList = () => {
    return props.sheets.map((piece) => {
      //piano piece for 'paid' and 'free' have defined css class
      let priceClass = piece.price === "free" ? "free" : "paid";
      return (
        <Card
          id={piece.id}
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='piano-sheets'
    >
      <span className='main-title'>All Piano Sheets</span>
      <div className='piano-sheets__add icon'>
        <img alt='add_icon' src={addIcon} onClick={props.toggleModal} />
        <p className='piano-sheets__add-label'>New Sheet</p>
      </div>
      <div className='piano-sheets__list'>{renderList()}</div>
    </motion.div>
  );
};

export default connect(mapStateToProps, { addSheet })(PianoSheets);
