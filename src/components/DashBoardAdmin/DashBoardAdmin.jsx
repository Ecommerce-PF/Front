import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../DashBoardAdmin/DashBoardAdmin.module.css";
import { FaArrowLeft } from "react-icons/fa";

const Admin = () => {
  const userId = useSelector((state) => state.userId);


  if (userId.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("userId", userId.admin);
  }

  const userAdmin = localStorage.getItem("userId");

  return userAdmin === "true" ? (
   
   
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
  ) 
  : 
  <div>
    <h1>USTED NO TIENE PERMISOS </h1>
  </div>
};

export default Admin;
