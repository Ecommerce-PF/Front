import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import { useDispatch } from "react-redux";
import { sinIniciar } from "../../redux/actions/actions";
import { google } from "../../redux/actions/actions";
import { admin } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSinIniciar = () => {
    const e = "no";
    dispatch(sinIniciar(e));
    dispatch(google("no"));
    dispatch(admin(false));
    navigate("/home");
    window.location.reload();
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
              <button className={s.btn}>Iniciar sesión</button>
            </Link>
            <Link className={s.btnS} to="/signup">
              <button className={s.btn}>Registrarse</button>
            </Link>
            <button onClick={handleSinIniciar} className={s.btn}>
              Inicio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
