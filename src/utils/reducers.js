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
const allReducers = combineReducers({
  sheets: getSheetsReducer,
  currentFilter: getFilterReducer,
});

export default allReducers;
