import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import { useDispatch } from "react-redux";
import { consultaSiIniciado, resetFavorites } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { loginWithGoogle, idUser } from "../../redux/actions/actions";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("esteUsuario");
  const [password, setPassword] = useState("Noinisio");

  const handleSinIniciar = async () => {
    dispatch(consultaSiIniciado("no"));
    dispatch(resetFavorites())
    navigate("/home");

      try {
        const response = await axios.post("/users/login", {
          userName,
          password,
        });
  
        if (response.status === 200) {
          const data = response.data;
          const userId = data.user.id;
  
          dispatch(loginWithGoogle("no"));
          dispatch(idUser(userId));

          navigate("/home");
        } else {
        }
      } catch (error) {
      }
    };
  

  return (
    <section className={s.back}>
      <div className={s.body}>
        <div className={s.titles}>
          <h1 className={s.title}>THRIFT SHOP</h1>
          <h1 className={s.text}>should be better</h1>
        </div>

        <div className={s.divTextBtn}>
          <div className={s.btnContainer}>
            <Link className={s.btnS} to="/login">
              <button className={s.btn}>Log in</button>
            </Link>
            <Link className={s.btnS} to="/signup">
              <button className={s.btn}>Sign In</button>
            </Link>
            <button onClick={handleSinIniciar} className={s.btn}>
            Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
