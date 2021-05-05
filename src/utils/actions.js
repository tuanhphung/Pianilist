//Action Creators

export const addSheet = (sheets) => {
  return {
    type: "GET_SHEETS",
    payload: sheets,
  };
};

//When user clicks 'free' or 'paid' tag, change 'currentFiler' in redux store
export const changeFilter = (filter) => {
  return {
    type: "GET_FILTER",
    payload: filter,
  };
};

export const toggleEdit = (isOpen) => {
  return {
    type: "TOGGLE_EDIT",
    payload: isOpen,
  };
};

export const getSheetId = (id) => {
  return {
    type: "GET_SHEETID",
    payload: id,
  };
};

export const toggleTheme = (isOpen) => {
  return {
    type: "TOGGLE_THEME",
    payload: isOpen,
  };
};
