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
