import { createContext, useReducer } from 'react';
import Reducer from './Reducer';
import { REPEAT } from './Constant';

const INITIAL_STATE = {
  user: null,
  playlist: [],
  isFetching: false,
  error: false,
  player: {
    show: false,
    selectedSong: null,
    isPlay: false,
    type: "one", // type === one || playlist || lovesong; if type === one => play one, playlist => play all playlist, loveSong => play all love song
    playlist: "",
    repeat: window.localStorage.getItem("playerRepeat") ? window.localStorage.getItem("playerRepeat") : REPEAT.NONE
  },
  loveSong: [],
};

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
