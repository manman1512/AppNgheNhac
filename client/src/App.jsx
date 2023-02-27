import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  Login, Register, Dashboard, Favorite, Playlist, Setting } from './page';
import Layout from './components/layout';
import { useContext, useEffect } from 'react';
import { Context } from './components/store/Context';
import axiosClient from './axiosClient';
import usersApi from './axiosClient/api/users';
import { setUser } from './components/store/Action';
function App() {
  
  const [state, dispatch] = useContext(Context)
  useEffect(()=>{
    const token = window.localStorage.getItem('accessToken');
    // console.log(token);
    if(token !== null){
      (async () =>{
        const user = await usersApi.getMe();
        dispatch(setUser(user))
      })();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="favorite" element={<Favorite/>}/>
        <Route path="/playlist" element={<Playlist />}/>
        <Route path="/setting" element={<Setting />}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
