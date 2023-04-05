const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload, //set lại User (payload: dữ liệu mang theo)
      };
    case 'SET_PLAYLIST':
      return {
        ...state,
        playlist: action.payload
      }
    case 'UPDATE_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'UPDATE_FAILURE':
      return {
        ...state,
        user: state.user,
        isFetching: false,
        error: true,
      };
    case 'UPDATE_AVATAR':
      return {
        ...state,
        user: {
          ...state.user,
          profilePic: action.payload,
        },
      };
    case 'SET_SELECTED_SONG':
      return {
        ...state,
        player: {
          ...state.player,
          selectedSong: action.payload,
        },
      };
    case 'TOGGLE_PLAY':
      console.log(state.player.isPlay);
      return {
        ...state,
        player: {
          ...state.player,
          isPlay: !state.player.isPlay,
        },
      };
    case 'SET_LIST_SONG':
      return {
        ...state,
        listSong: action.payload,
      };
    case 'UPDATE_PLAYLIST':
      return {
        ...state,
        isFetching: true,
      };
    case 'UPDATE_PLAYLIST_SUCCESS':
      return {
        ...state,
        playlist: action.payload,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
