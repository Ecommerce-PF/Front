// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { getUserAll, getUserById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const id = useSelector((state) => state.idUsuario);



  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }

  const idUser = localStorage.getItem("ids");



  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserAll());
      await dispatch(getUserById(idUser));
    };
    fetchData();
  }, [dispatch, idUser]);

  const { name, email, phone, address, purchaseHistory } = userId;

  return (
    <div>
      <h2 className={styles.title}>Profile</h2>
      <p className={styles.info}>Name: {name}</p>
      <p className={styles.info}>Username: {userId.userName}</p>
      <p className={styles.info}>Email: {email}</p>
      <p className={styles.info}>Phone: {phone}</p>

      <h3 className={styles.subtitle}>Address {address}</h3>
      <p className={styles.address}></p>

      <h3 className={styles.subtitle}>Purchase History </h3>
      <ul className={styles.purchaseList}>
        {purchaseHistory &&
          purchaseHistory.map((purchase) => (
            <li key={purchase.id}>
              <p className={styles.purchaseInfo}>Product: {purchase.product}</p>
              <p className={styles.purchaseInfo}>Price: {purchase.price}</p>
              <p className={styles.purchaseInfo}>Date: {purchase.date}</p>
            </li>
          ))}
      </ul>

      <Link to="/home">
        <button className={styles.button}>
          Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
        </button>
      </Link>
    </div>
  );
};

export default Profile;
