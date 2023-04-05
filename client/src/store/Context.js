import { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
  user: null,
  playlist:[],
  isFetching: false,
  error: false,
  player: {
    selectedSong: null,
    isPlay: false,
  }
};

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
