import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/bar/Navigation';
import Main from "./components/main"
import {Dashboard, Favorite} from "./page";
function App() {
  return (
    <Router>
      <div className="flex box-border h-screen">
      <Navigation className="w-[4rem] bg-[#FAFAFA] py-6 box-border flex flex-col items-center justify-between" />
      <Main className="w-full">
        <Routes >
          <Route path="/" element={<Dashboard />} />
          <Route path="/favorite" element={<Favorite/>}/>
        </Routes>
      </Main>
      </div>
    </Router>
  );
}

export default App;
