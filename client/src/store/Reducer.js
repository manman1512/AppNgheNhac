import {
  ADD_LOVE_SONG,
  ADD_SONG_TO_PLAYLIST,
  HANDLE_PAUSE,
  HANDLE_PLAY,
  PLAYER_TYPE,
  REMOVE_LOVE_SONG,
  SET_FAVORITE_SONG,
  SET_LIST_SONG,
  SET_LOVE_SONG,
  SET_PLAYER_PLAYLIST,
  SET_PLAYER_TYPE,
  SET_REPEAT,
  SET_SELECTED_PLAYLIST,
  TOGGLE_SHOW_PLAYER,
  UPDATE_LINK_SONG,
} from './Constant';

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
        playlist: action.payload,
      };
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
    case SET_LIST_SONG:
      return {
        ...state,
        playlist: state.playlist.map((p) => {
          if (
            p.selected ||
            (action.payload._id && action.payload._id === p._id)
          ) {
            return {
              ...p,
              listSong: action.payload.listSong,
            };
          } else {
            return p;
          }
        }),
      };
    case HANDLE_PLAY:
      return {
        ...state,
        player: {
          ...state.player,
          isPlay: true,
        },
      };
    case HANDLE_PAUSE:
      return {
        ...state,
        player: {
          ...state.player,
          isPlay: false,
        },
      };
    case 'UPDATE_PLAYLIST':
      return {
        ...state,
        isFetching: true,
      };
    case SET_REPEAT:
      window.localStorage.setItem('playerRepeat', action.payload);

      return {
        ...state,
        player: {
          ...state.player,
          repeat: action.payload,
        },
      };

    case SET_SELECTED_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.map((p) => {
          if (p._id === action.payload)
            return {
              ...p,
              selected: true,
            };
          else
            return {
              ...p,
              selected: false,
            };
        }),
      };
    case ADD_SONG_TO_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.map((p) => {
          if (p.selected) {
            return {
              ...p,
              listSong: p.listSong
                ? [...p.listSong, action.payload]
                : [action.payload],
            };
          } else {
            return p;
          }
        }),
      };
    case SET_LOVE_SONG:
      return {
        ...state,
        loveSong: action.payload,
      };
    case ADD_LOVE_SONG:
      return {
        ...state,
        loveSong: [...state.loveSong, action.payload],
      };
    case REMOVE_LOVE_SONG:
      return {
        ...state,
        loveSong: state.loveSong.filter((ls) => ls._id !== action.payload._id),
      };
    case UPDATE_LINK_SONG:
      console.log(state.playlist);
      return {
        ...state,
        playlist: state.playlist.map((pl) => {
          return {
            ...pl,
            listSong: pl.listSong
              ? pl.listSong.map((song) => {
                  if (song._id === action.payload.songId) {
                    return {
                      ...song,
                      link: action.payload.link,
                    };
                  } else {
                    return song;
                  }
                })
              : [],
          };
        }),
        loveSong: state.loveSong.map((ls) => {
          if (ls._id === action.payload.songId) {
            return {
              ...ls,
              link: action.payload.link,
            };
          } else {
            return ls;
          }
        }),
      };
    case SET_PLAYER_TYPE:
      if (
        action.payload === PLAYER_TYPE.ONE ||
        action.payload === PLAYER_TYPE.LOVESONG
      ) {
        return {
          ...state,
          player: {
            ...state.player,
            type: action.payload,
            playlist: '',
          },
        };
      } else {
        return {
          ...state,
          player: {
            ...state.player,
            type: action.payload,
          },
        };
      }
    case SET_PLAYER_PLAYLIST:
      return {
        ...state,
        player: {
          ...state.player,
          playlist: action.payload,
        },
      };
    case TOGGLE_SHOW_PLAYER:
      return {
        ...state,
        player: {
          ...state.player,
          show: !state.player.show,
        },
      };
    default:
      return state;
  }
};

export default Reducer;
