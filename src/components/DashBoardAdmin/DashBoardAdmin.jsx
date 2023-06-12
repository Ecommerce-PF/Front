import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from "../DashBoardAdmin/DashBoardAdmin.module.css"

const Admin = () => {
  return (
    <div className={style.container}>
      <div className="btn-group btn-group-toggle m-1">
        
        <div>
        <Link  to="/CreatePost" className={style.link}>
          Create Product
        </Link>
        </div>
        
        <div>
        <Link to="/Delete" className={style.link}>
          Delete Product
        </Link>
        <Link to="/Order" className={style.link}>
          Order Users
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;