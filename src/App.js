import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Landing from "./Landing";
import PianoSheets from "./PianoSheets";
import PriceSheets from "./PriceSheets/PriceSheets";
import TagSheet from "./TagSheet/TagSheet";
import Modal from "./reusable/Modal/Modal";
import EditModal from "./EditModal/EditModal";

import "./App.css";

//get state from redux store
const mapStateToProps = (state) => {
  return {
    isModalOpen: state.isEditModalOpen,
  };
};

const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route path='/sheets' render={() => <PianoSheets toggleModal={toggleModal} />} />
        <Route path='/filtered' render={() => <PriceSheets />} />
        <Route path='/filteredTag' render={() => <TagSheet />} />
        <Modal isOpen={isOpen} toggleModal={toggleModal} />
        <EditModal isOpen={props.isModalOpen} />
      </div>
    </BrowserRouter>
  );
};

export default connect(mapStateToProps)(App);
