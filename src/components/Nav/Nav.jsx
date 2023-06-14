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
    window.location.reload();
  };

  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        <h1 className={style.titleEspecial}>ClotheStore</h1>
      </Link>

      <SearchBar />

      <div className={style.loginSing}>
        <React.Fragment>
          {sesions === "no" ? (
            <Link to="/login">
              <button className={style.button}>Login</button>
            </Link>
          ) : (
            <div className={style.contenedor_imagen}>
              <Link className={style.link} to="/profile">
                <svg
                  className={style.svg}
                  width="800px"
                  height="800px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 14.5C7 15 5.5 16 5.5 19.5H19.5C19.5 16 18.3416 15.1708 17 14.5C16 14 14 14 14 12.5C14 11 15 10.25 15 8.25C15 6.25 14 5.25 12.5 5.25C11 5.25 10 6.25 10 8.25C10 10.25 11 11 11 12.5C11 14 9 14 8 14.5Z"
                    stroke="#121923"
                    stroke-width="1.2"
                  />
                </svg>
                <div class={style.texto_imagen}>PROFILE</div>
              </Link>
            </div>
          )}

          {sesions === "no" ? (
            <Link to="/signup">
              <button className={style.button}>SingUp</button>
            </Link>
          ) : (
            <div className={style.contenedor_imagen}>
              <button
                className={`${style.link} ${style.profileTitle} ${style.logoutButton}`}
                onClick={handleLogout}
              >
                <svg
                className={style.svg}
                  width="800px"
                  height="800px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 15V19.5H5.5V5.5H16.5V10M10 12.5H22.5"
                    stroke="#121923"
                    stroke-width="1.2"
                  />
                  <path
                    d="M20 10L22.5 12.5L20 15"
                    stroke="#121923"
                    stroke-width="1.2"
                  />
                </svg>
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

          <div className={style.contenedor_imagen}>
            <Link to="/carrito">
              <svg
                className={style.svg}
                width="800px"
                height="800px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 17.5L5.81763 6.26772C5.71013 5.81757 5.30779 5.5 4.84498 5.5H3M8 17.5H17M8 17.5C8.82843 17.5 9.5 18.1716 9.5 19C9.5 19.8284 8.82843 20.5 8 20.5C7.17157 20.5 6.5 19.8284 6.5 19C6.5 18.1716 7.17157 17.5 8 17.5ZM17 17.5C17.8284 17.5 18.5 18.1716 18.5 19C18.5 19.8284 17.8284 20.5 17 20.5C16.1716 20.5 15.5 19.8284 15.5 19C15.5 18.1716 16.1716 17.5 17 17.5ZM7.78357 14.5H17.5L19 7.5H6"
                  stroke="#121923"
                  stroke-width="1.2"
                />
              </svg>
              <div class={style.texto_imagen}>CARRITO DE COMPRAS</div>
            </Link>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Nav;
