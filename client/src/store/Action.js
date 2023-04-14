import { ADD_LOVE_SONG, ADD_SONG_TO_PLAYLIST, REMOVE_LOVE_SONG, SET_FAVORITE_SONG, SET_LIST_SONG, SET_LOVE_SONG, SET_SELECTED_PLAYLIST, UPDATE_LINK_SONG } from "./Constant";

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
    type: SET_LIST_SONG,
    payload: listSong,
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
  setPlaylist, setSelectedPlaylist, addSongToPlaylist, setLoveSong, addLoveSong, removeLoveSong, updateLinkSong
};
