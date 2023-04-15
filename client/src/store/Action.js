import { ADD_LOVE_SONG, ADD_SONG_TO_PLAYLIST, HANDLE_PAUSE, HANDLE_PLAY, REMOVE_LOVE_SONG, SET_FAVORITE_SONG, SET_LIST_SONG, SET_LOVE_SONG, SET_PLAYER_PLAYLIST, SET_PLAYER_TYPE, SET_REPEAT, SET_SELECTED_PLAYLIST, TOGGLE_SHOW_PLAYER, UPDATE_LINK_SONG } from "./Constant";

function setUser(user = null) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}
function setPlaylist(playlist = []) {
  return {
    type: 'SET_PLAYLIST',
    payload: playlist,
  };
}

function updateStart(userCredentials) {
  return {
    type: 'UPDATE_START',
  };
}

function updateSuccess(user) {
  return {
    type: 'UPDATE_SUCCESS',
    payload: user,
  };
}

function updateFailure() {
  return {
    type: 'UPDATE_FAILURE',
  };
}
function updateAvatar(img) {
  return {
    type: 'UPDATE_AVATAR',
    payload: img,
  };
}

function setSelectedSong(selectedSong) {
  return {
    type: 'SET_SELECTED_SONG',
    payload: selectedSong,
  };
}
function togglePlay() {
  return {
    type: 'TOGGLE_PLAY',
  };
}

function setListSong(listSong, _id) {
  return {
    type: SET_LIST_SONG,
    payload: {
      listSong,
      _id
    },
  };
}
function updatePlaylist(playlist) {
  return {
    type: 'UPDATE_PLAYLIST',
  }
}
function updatePlaylistSuccess(playlist) {
  return {
    type: 'UPDATE_PLAYLIST_SUCCESS',
    payload: playlist,
  };
}
function setSelectedPlaylist(id) {
  return {
    type: SET_SELECTED_PLAYLIST,
    payload: id
  }
}
function addSongToPlaylist(song) {
  return {
    type: ADD_SONG_TO_PLAYLIST,
    payload: song
  }
}
function setLoveSong(loveSong) {
  return {
    type: SET_LOVE_SONG,
    payload: loveSong
  }

}
function addLoveSong(song) {
  return {
    type: ADD_LOVE_SONG,
    payload: song
  }
}
function removeLoveSong(song) {
  return {
    type: REMOVE_LOVE_SONG,
    payload: song
  }
}
function updateLinkSong(songId, link) {
  return {
    type: UPDATE_LINK_SONG,
    payload: {
      songId,
      link
    }
  }
}
function setPlayerType(type){
  return {
    type: SET_PLAYER_TYPE,
    payload: type
  }
}
function setPlayerPlayList(playlistId){
  return {
    type: SET_PLAYER_PLAYLIST,
    payload: playlistId
  }
}
function handleSetRepeat(repeat){
  return {
    type: SET_REPEAT,
    payload: repeat
  }
}
function toggleShowPlayer(){
  return {
    type: TOGGLE_SHOW_PLAYER 
  }
}
function handlePlay(){
  return {
    type: HANDLE_PLAY
  }
}
function handlePause(){
  return {
    type: HANDLE_PAUSE
  }
}
export {
  setUser,
  updateStart,
  updateSuccess,
  updateFailure,
  updateAvatar,
  setSelectedSong,
  togglePlay,
  setListSong,
  updatePlaylist,
  updatePlaylistSuccess,
  setPlayerType,
  setPlayerPlayList,
  handleSetRepeat,
  toggleShowPlayer,
  handlePlay,
  handlePause,
  setPlaylist, setSelectedPlaylist, addSongToPlaylist, setLoveSong, addLoveSong, removeLoveSong, updateLinkSong
};
