import React, { useState, useEffect } from "react";
import Modals from "react-modal";
import firebase from "../utils/firebase";
import { toggleEdit } from "../utils/actions";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { customStyles } from "../reusable/Modal/customStyles";

Modals.setAppElement("#root");

//get state from redux store
const mapStateToProps = (state) => {
  return {
    isModalOpen: state.isEditModalOpen,
    sheetId: state.sheetId,
    darkMode: state.darkMode,
  };
};

const EditModal = (props) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [sheetLink, setSheetLink] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState(""); //single tag
  const [tags, setTags] = useState([]); // array of tag

  // change modal background colour / colour depending on dark or light theme
  customStyles.content.backgroundColor = props.darkMode ? "black" : "#f6f8f9";
  customStyles.content.color = props.darkMode ? "white" : "black";
  // modal inputs dark and light theme
  let classTheme = props.darkMode ? "modal__input--dark" : "modal__input--light";

  //get specific record from Sheets table from database
  useEffect(async () => {
    if (props.sheetId !== null) {
      const recordRef = firebase.database().ref("Sheets").child(props.sheetId);
      const response = await recordRef.get();
      const record = response.val();
      setTitle(record.title);
      setArtist(record.artist);
      setVideoLink(`https://www.youtube.com/watch?v=${record.videoId}`);
      setSheetLink(record.link);
      setTags(record.tags);
    } else return;
  }, [props.sheetId]);

  // show tags added on pressing enter
  const printTag = () => {
    if (tags) {
      return tags.map((tag) => <span className='modal__tag-custom'>{tag}</span>);
    } else return;
  };

  //valide modal form
  const validate = () => {
    if (title === "" || sheetLink === "" || videoLink === "" || price === "") {
      return false;
    } else return true;
  };

  //trim URL link down to YouTube's video ID only
  const trimURLtoID = (url) => {
    const videoID = url.split("=");
    return videoID[1];
  };

  //update database
  const updateRecord = () => {
    //validate forms
    const isValidated = validate();
    if (isValidated) {
      let confirm = window.confirm(`Update entry for ${title}?`);
      if (confirm) {
        //trim URL link down to YouTube's video ID only
        const videoID = trimURLtoID(videoLink);
        //refer to the record in the table
        const recordRef = firebase.database().ref("Sheets").child(props.sheetId);
        recordRef.update({
          title: title,
          artist: artist,
          videoId: videoID,
          link: sheetLink,
          price: price,
          tags: tags,
        });
        //close modal after update
        props.toggleEdit(props.isModalOpen);
      } else return;
    } else alert("Required fields must be entered");
  };

  // add a tag to a tag array
  const addTagToArray = (event) => {
    event.preventDefault();
    // max tags up to 6 AND Tags more than 3 letters
    if (tags.length < 6 && tag.split("").length >= 3) {
      // add tag to the array after pressing enter (submit)
      setTags([...tags, tag]);
    } else {
      return;
    }
    //clear value of tag
    setTag("");
  };

  return (
    <Modals isOpen={props.isModalOpen} style={customStyles}>
      <h1>Edit Sheet</h1>
      <motion.div
        className={`modal--${props.darkMode ? "dark" : "light"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <input
          className={classTheme}
          type='text'
          placeholder='Music Title (required)'
          maxLength='40'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={classTheme}
          type='text'
          placeholder='Artist'
          maxLength='40'
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          className={classTheme}
          type='text'
          placeholder='Video Link (required)'
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        <input
          className={classTheme}
          type='text'
          placeholder='Link to Sheet (required)'
          value={sheetLink}
          onChange={(e) => setSheetLink(e.target.value)}
        />

        <select
          required
          className={classTheme}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        >
          <option value='' disabled selected>
            Sheet Price (required)
          </option>
          <option value='free'>Free</option>
          <option value='paid'> Paid </option>
        </select>

        <form className='modal__tag-form' onSubmit={addTagToArray}>
          <input
            className={classTheme}
            type='text'
            placeholder='Tags (up to 6)'
            maxLength='10'
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            maxLength='10'
          />
        </form>

        <div className='modal__added-tags'>{printTag()}</div>
        <div className='modal__clearbtn' onClick={() => setTags([])}>
          clear tags
        </div>
        <div className='modal__buttons'>
          <div className='button' onClick={updateRecord}>
            Update
          </div>
          <div className='button' onClick={() => props.toggleEdit(props.isModalOpen)}>
            Cancel
          </div>
        </div>
      </motion.div>
    </Modals>
  );
};

export default connect(mapStateToProps, { toggleEdit })(EditModal);
