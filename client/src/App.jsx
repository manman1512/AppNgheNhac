import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Login,
  Register,
  Dashboard,
  Favorite,
  Playlist,
} from './page';

import DetailPlaylist from './page/playlist/detailPlaylist'

import Layout from './components/layout';
import { useContext, useEffect } from 'react';
import { Context } from './store/Context';
import axiosClient from './axiosClient';
import usersApi from './axiosClient/api/users';
import { setUser } from './store/Action';

function App() {
  // const [state, dispatch] = useContext(Context);
  // useEffect(() => {
  //   const token = window.localStorage.getItem('accessToken');
  //   console.log(token);
  //   if (token !== null) {
  //     (async () => {
  //       const response = await usersApi.getMe();
  //       // console.log(response.data.User);
  //       dispatch(setUser(response.data.User));
  //     })();
  //   }
  //   console.log(state)
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlist/:playlistId" element={<DetailPlaylist />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
