function setUser(user = null) {
  return {
    type: 'SET_USER',
    payload: user,
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
export {
  setUser,
  updateStart,
  updateSuccess,
  updateFailure,
  updateAvatar,
  setSelectedSong,
  togglePlay,
  setListSong,
};
