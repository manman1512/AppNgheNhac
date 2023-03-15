import { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};
