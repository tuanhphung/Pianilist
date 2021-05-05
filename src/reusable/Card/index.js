import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { changeFilter, toggleEdit, getSheetId } from "../../utils/actions";
import { motion } from "framer-motion";
import firebase from "../../utils/firebase";
import noteIcon from "../../assets/music-note.svg";
import editIcon from "../../assets/edit.svg";
import binIcon from "../../assets/bin.svg";
import editIcon_white from "../../assets/edit_white.svg";
import noteIcon_white from "../../assets/music-note_white.svg";
import binIcon_white from "../../assets/bin_white.svg";
import "./Card.css";

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.isEditModalOpen,
    darkMode: state.darkMode,
  };
};

const Card = (props) => {
  const renderTags = () => {
    // render tags only if there is at least one.
    if (props.tags) {
      return props.tags.map((tag) => {
        return <div className='card__tag-custom tag-hover'>{tag}</div>;
      });
    }
  };

  // remove a sheet
  const removeSheet = () => {
    let confirm = window.confirm("Are you sure you want to remove?");
    if (confirm) {
      //reference to a specific record on the Sheets table identified by id on database.
      const sheetRef = firebase.database().ref("Sheets").child(props.id);
      sheetRef.remove();
    }
    return;
  };

  //toggle edit modal and current sheets ID to edit.
  const editSheet = () => {
    props.toggleEdit(props.isModalOpen);
    props.getSheetId(props.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      className={`card--${props.darkMode ? "dark" : "light"}`}
    >
      <img
        alt='edit_icon'
        src={props.darkMode ? editIcon_white : editIcon}
        className='card__edit'
        onClick={editSheet}
      />
      <img
        alt='bin_icon'
        src={props.darkMode ? binIcon_white : binIcon}
        className='card__bin'
        onClick={removeSheet}
      />
      <span className='card__title'>{props.title}</span>
      <h3 className='card__artist'>By : {props.artist}</h3>
      <iframe
        loading='lazy'
        title={`videoId_$${props.videoId}`}
        className='card__video'
        src={`https://www.youtube.com/embed/${props.videoId}`}
      ></iframe>
      <div className='card__sheet-links'>
        <img alt='note_icon' src={props.darkMode ? noteIcon_white : noteIcon} />
        <a href={props.link} target='_blank' rel='noreferrer'>
          Sheet Music
        </a>
      </div>
      <div className='card__tags'>
        <div className='card__tag-price'>
          <NavLink to='/filtered'>
            <span
              className={`card__tag-price--${props.class} tag-hover`}
              onClick={() => props.changeFilter(props.price)}
            >
              {props.price}
            </span>
          </NavLink>
        </div>

        <div className='card__tag-customs'>{renderTags()}</div>
      </div>
    </motion.div>
  );
};

export default connect(mapStateToProps, { changeFilter, toggleEdit, getSheetId })(Card);
