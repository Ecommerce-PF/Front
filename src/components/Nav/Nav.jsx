import React, { useState } from "react";
import style from "./Nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import carrito from "../../assets/carrito-de-compras.png";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.adminUser);

  console.log(admin, "esto es admin");

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        <h1 className={style.titleEspecial}>ClotheStore</h1>
      </Link>

      <SearchBar />

      <div className={style.loginSing}>
        {isLoggedIn ? (
          <React.Fragment>
            <Link className={style.link} to="/profile">
              <h1 className={`${style.titleLogin} ${style.profileTitle}`}>
                Profile
              </h1>
            </Link>
            <button
              className={`${style.link} ${style.profileTitle} ${style.logoutButton}`}
              onClick={handleLogout}
            >
              Log out
            </button>

            {admin === true ? (
              <Link className={style.link} to="/DashBoardAdmin">
                <h1 className={`${style.titleLogin} ${style.profileTitle}`}>
                  Admin
                </h1>
              </Link>
            ) : null}

            <Link to="/carrito">
              <img className={style.carrito} src={carrito} alt="" />
            </Link>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default Nav;
