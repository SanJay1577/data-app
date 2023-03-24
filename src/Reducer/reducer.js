const reducer = (state, action) => {
  switch (action.type) {
    case "add-user":
      return { ...state, user: [...state.user, action.payload] };
    case "delete-user":
      return { ...state, user: action.payload };
    case "edit-user":
      return { ...state, user: [...state.user] };
    case "get-from-api":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export default reducer;
