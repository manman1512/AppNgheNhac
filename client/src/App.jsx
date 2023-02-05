import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  Login, Register, Dashboard, Favorite, Playlist, Setting } from './page';
import Layout from './components/layout';
function App() {
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
