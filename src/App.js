import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import DashBoardAdmin from "./components/DashBoardAdmin/DashBoardAdmin";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import LandingPage from "./components/LandingPage/LandingPage";
import CreatePost from "./components/DashBoardAdmin/CreatePost";
import Delete from "./components/DashBoardAdmin/Delete";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/DashBoardAdmin/*" element={<DashBoardAdmin />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;