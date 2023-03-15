const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload, //set lại User (payload: dữ liệu mang theo)
      };
    case 'UPDATE_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'UPDATE_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'UPDATE_FAILURE':
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };
    case 'UPDATE_AVATAR':
      return {
        ...state,
        user:{
          ...state.user,
          profilePic: action.payload
        }
      };
    default:
      return state;
  }
};

export default Reducer;
