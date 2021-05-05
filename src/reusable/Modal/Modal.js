import React, { useState } from "react";
import Modals from "react-modal";
import firebase from "../../utils/firebase";
import { motion } from "framer-motion";
import { customStyles } from "./customStyles";
import axios from "axios";
import "./Modal.css";

Modals.setAppElement("#root");

/* NOTE - Some code have been commented out in case the use of 'noembed' API stops working / reaches its API limite. DONT DELETE. */

const Modal = (props) => {
  //const [title, setTitle] = useState("");
  //const [artist, setArtist] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [sheetLink, setSheetLink] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState(""); //single tag
  const [tags, setTags] = useState([]); // array of tag

  //toggle modal
  const closeModal = () => {
    props.toggleModal();
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

  // show tags added on pressing enter
  const printTag = () => {
    if (tags.length > 0) {
      return tags.map((tag) => <span className='modal__tag-custom'>{tag}</span>);
    } else return;
  };

  //trim URL link down to YouTube's video ID only
  const trimURLtoID = (url) => {
    const videoID = url.split("=");
    return videoID[1];
  };

  //valide modal form
  const validate = () => {
    if (sheetLink === "" || videoLink === "" || price === "") {
      return false;
    } else return true;
  };

  // clear values
  const clearValues = () => {
    // setTitle("");
    // setArtist("");
    setVideoLink("");
    setSheetLink("");
    setPrice("");
    setTag("");
    setTags("");
  };

  const cancelAddSheet = () => {
    props.toggleModal();
    clearValues();
  };

  const postToDB = async () => {
    //validate forms
    const isValidated = validate();

    if (isValidated) {
      let confirm = window.confirm(`Add to sheets?`);
      if (confirm) {
        // use noembed API to get video title and author with link
        let response = await axios.get(`https://noembed.com/embed?url=${videoLink}`);
        let embeddedVideo = response.data;
        console.log(embeddedVideo);

        //--------trim URL link down to YouTube's video ID only
        const videoID = trimURLtoID(videoLink);
        //--------refer to 'Sheets' table on RT database
        const databaseSheetRef = firebase.database().ref("Sheets");
        //--------/make a record (object) for database
        const sheetRecord = {
          title: embeddedVideo.title,
          artist: embeddedVideo.author_name,
          videoId: videoID,
          link: sheetLink,
          price: price,
          tags: tags,
        };
        //--------push record to the database
        databaseSheetRef.push(sheetRecord);
        //--------clear values of modal
        clearValues();
        closeModal();
      } else return;
    } else {
      alert("Required fields must be entered");
    }
  };

  return (
    <Modals isOpen={props.isOpen} style={customStyles}>
      <h1>New Piano Sheet</h1>
      <motion.div className='modal' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <input
          className='modal__input'
          type='text'
          placeholder='Video Link (required)'
          value={videoLink}
          onChange={(event) => setVideoLink(event.target.value)}
        />

        <input
          className='modal__input'
          type='text'
          placeholder='Link to Sheet (required)'
          value={sheetLink}
          onChange={(event) => setSheetLink(event.target.value)}
        />

        <select
          required
          className='modal__input'
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
            className='modal__input'
            type='text'
            placeholder='Tags (up to 6)'
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
          <div className='button' onClick={postToDB}>
            Confirm
          </div>
          <div className='button' onClick={cancelAddSheet}>
            Cancel
          </div>
        </div>
      </motion.div>
    </Modals>
  );
};

export default Modal;

/* 

------------------- INPUT FOR TITLE AND ARTIST -------------------
 <input
          className='modal__input'
          type='text'
          placeholder='Music Title (required)'
          maxLength='40'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <input
          className='modal__input'
          type='text'
          placeholder='Artist'
          maxLength='40'
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
        />

*/
