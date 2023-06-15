import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Carrito from "./components/carrito/Carrito.jsx";
import DashBoardAdmin from "./components/DashBoardAdmin/DashBoardAdmin";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import LandingPage from "./components/LandingPage/LandingPage";
import CreatePost from "./components/DashBoardAdmin/CreatePost";
import Delete from "./components/DashBoardAdmin/Delete";
import Order from "./components/DashBoardAdmin/OrdersUsers";
import MercadoPagoAceptado from "./components/MercadoPago/MercadoPagoAceptado";
import MercadoPagoPendiente from "./components/MercadoPago/MercadoPagoPendiente";
import MercadoPagoRechazado from "./components/MercadoPago/MercadoPagoRechazado";

import EditProduct from "./components/DashBoardAdmin/EditProduct";
//salve el mundoa
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail/:id" element={<Detail />} />
        {/* <Route path="/post" element={<CreatePost />} /> */}
        <Route path="/carrito" element={<Carrito />} />
        {/* <Route path="/dash" element={<DashBoard />} /> */}

        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/DashBoardAdmin/*" element={<DashBoardAdmin />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/Delete" element={<Delete />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pending" element={<MercadoPagoPendiente />} />
        <Route path="/success" element={<MercadoPagoAceptado />} />
        <Route path="/failure" element={<MercadoPagoRechazado />} />
      </Routes>
    </div>
  );
}

export default App;
