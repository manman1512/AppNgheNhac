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

function setListSong(listSong) {
  return {
    type: 'SET_LIST_SONG',
    payload: listSong,
  };
}
function updatePlaylist(playlist){
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
  setPlaylist
};
