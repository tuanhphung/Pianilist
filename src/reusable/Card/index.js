import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { changeFilter } from "../../utils/actions";
import noteIcon from "../../assets/music-note.svg";
import { motion } from "framer-motion";
import "./Card.css";

const index = (props) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };

  const renderTags = () => {
    // render tags only if there is at least one.
    if (props.tags) {
      return props.tags.map((tag) => {
        return <span className='card__tag-custom tag-hover'>{tag}</span>;
      });
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.07 }} className='card'>
      <span className='card__title'>{props.title}</span>
      <h3 className='card__artist'>By : {props.artist}</h3>
      <iframe
        className='card__video'
        src={`https://www.youtube.com/embed/${props.videoId}`}
      ></iframe>
      <div className='card__sheet-links'>
        <img src={noteIcon} />
        <a href={props.link} target='_blank'>
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

export default connect(null, { changeFilter })(index);
