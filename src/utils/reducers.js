import { combineReducers } from "redux";

const getSheetsReducer = (sheets = [], action) => {
  switch (action.type) {
    case "GET_SHEETS":
      return action.payload;
    default:
      return sheets;
  }
};

const getFilterReducer = (filter = "", action) => {
  switch (action.type) {
    case "GET_FILTER":
      return action.payload;
    default:
      return filter;
  }
};

const toggleEditModalReducer = (isOpen = false, action) => {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return !isOpen;
    default:
      return isOpen;
  }
};

const getSheetIdReducer = (id = null, action) => {
  switch (action.type) {
    case "GET_SHEETID":
      return action.payload;
    default:
      return id;
  }
};

const allReducers = combineReducers({
  sheets: getSheetsReducer,
  currentFilter: getFilterReducer,
  isEditModalOpen: toggleEditModalReducer,
  sheetId: getSheetIdReducer,
});

export default allReducers;
