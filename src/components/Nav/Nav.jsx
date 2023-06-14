import React, { useState } from "react";
import style from "./Nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import carrito from "../../assets/carrito-de-compras.png";
import Admin from "../../assets/ajustes.png";
import Usuario from "../../assets/usuario.png";
import Logout from "../../assets/cerrar-sesion.png";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.adminUser);
  const sesionSinIniciar = useSelector((state) => state.inicio);
  const sesionIniciada = useSelector((state) => state.iniciado);
  console.log(
    sesionSinIniciar,
    "sesionSinIniciarsesionSinIniciarsesionSinIniciar"
  );
  console.log(sesionIniciada, "sesionIniciadasesionIniciadasesionIniciada");

  if (sesionSinIniciar.length === 0 || sesionSinIniciar === undefined) {
    // No hacer nada
  } else {
    localStorage.setItem("sesions", sesionSinIniciar);
  }

  if (sesionIniciada === undefined || sesionIniciada.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("sesions", sesionIniciada);
  }

  const sesions = localStorage.getItem("sesions");

  console.log(sesions, "sesions");

  if (admin.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("admins", admin);
  }

  const userAdmin = localStorage.getItem("admins");

  /**************************************** */

  function mostrarTexto(elemento) {
    elemento.nextSibling.style.display = "block";
  }

  function ocultarTexto(elemento) {
    elemento.nextSibling.style.display = "none";
  }

  /**************************************** */

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const navigate = useNavigate();


  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload()
  };

  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        <h1 className={style.titleEspecial}>ClotheStore</h1>
      </Link>

      <SearchBar />

      <div className={style.loginSing}>
        <React.Fragment>
          {sesions === "no" ? <Link to="/login"><button className={style.button}>Login</button></Link> : (
            <div className={style.contenedor_imagen}>
              <Link className={style.link} to="/profile">
                <img className={style.carrito} src={Usuario} alt="" />
                <div class={style.texto_imagen}>PROFILE</div>
              </Link>
            </div>
          )}

          {sesions === "no" ? (
            <Link to="/signup"><button className={style.button}>SingUp</button></Link>
          ) : (
            <div className={style.contenedor_imagen}>
              <button
                className={`${style.link} ${style.profileTitle} ${style.logoutButton}`}
                onClick={handleLogout}
              >
                <img className={style.carrito} src={Logout} alt="" />
                <div class={style.texto_imagen}>LogOut</div>
              </button>
            </div>
          )}

          <div className={style.contenedor_imagen}>
            {userAdmin === "true" ? (
              <Link className={style.link} to="/DashBoardAdmin">
                <img className={style.carrito} src={Admin} alt="" />
                <div className={style.texto_imagen}>
                  ADMINISTRACION DE ADMINISTRADOR
                </div>
              </Link>
            ) : null}
          </div>

          <div className={style.contenedor_imagen2}>
            <Link to="/carrito">
              <img className={style.carrito1} src={carrito} alt="" />
              <div class={style.texto_imagen}>CARRITO DE COMPRAS</div>
            </Link>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Nav;
