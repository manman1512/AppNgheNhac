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
    case "SET_SELECTED_SONG":
      return{
        ...state,
        player:{
          ...state.player,
          selectedSong: action.payload
        }
      }
    case "TOGGLE_PLAY":
      console.log(state.player.isPlay)
      return {
        ...state,
        player:{
          ...state.player,
          isPlay: !state.player.isPlay
        }
      }
    default:
      return state;
  }
};

export default Reducer;
