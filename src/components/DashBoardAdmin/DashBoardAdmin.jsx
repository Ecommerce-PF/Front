import React from "react";
import { Link } from "react-router-dom";
import style from "../DashBoardAdmin/DashBoardAdmin.module.css";
import { FaArrowLeft } from "react-icons/fa";

const Admin = () => {
  return (
    <div className={style.container}>
      <div className={style.buton_container}>
        <Link to="/CreatePost" className={style.link}>
          Create Product
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/Delete" className={style.link}>
          Delete Product
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/Order" className={style.link}>
          Order Users
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/OrderList" className={style.link}>
          Order List
        </Link>
      </div>{" "}
      <div className={style.buton_container}>
        <Link to="/Stock" className={style.link}>
          Stock
        </Link>
      </div>
      <div className={style.buton_container}>
        <Link to="/home">
          <button className={style.button}>
            Back <FaArrowLeft className={style.icon}></FaArrowLeft>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
