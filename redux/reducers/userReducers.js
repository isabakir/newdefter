const initialState = {
  name: "",
  password: "",
  type: "",
  token: "",
};

export default userReducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
