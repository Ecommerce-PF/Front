import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { getUserAll, getUserById } from "../../redux/actions/actions";
import mas from "../../assets/mas.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.userId);
  const id = useSelector((state) => state.idUsuario);

  console.log(id);

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("id", id);
  }

  const idUser = localStorage.getItem("id");

  const [userOnline, setUserOnline] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserAll());
      await dispatch(getUserById(idUser));
    };
    fetchData();
  }, [dispatch, idUser]);

  useEffect(() => {
    if (user && user.length > 0) {
      setUserOnline(user[user.length - 1]);
    }
  }, [user]);

  if (!userOnline) {
    return null; // O redirige al usuario a la página de inicio de sesión u otra página apropiada
  }

  function showAlert() {
    alert("En proceso");
  }

  const alerts = showAlert;

  const { name, email, password, phone, address, purchaseHistory } = userId;

  return (
    <div className={styles.back}>
      <div className={styles.border}>
        <h2 className={styles.title}>Profile</h2>
        <p className={styles.info}>Name: {name}</p>
        <p className={styles.info}>Username: {userId.userName}</p>
        <p className={styles.info}>Email: {email}</p>
        <p className={styles.info}>Phone: {phone}</p>

        <h3 className={styles.subtitle}>Address {address}</h3>

        <img className={styles.imgs} src={mas} onClick={alerts} />

        <p className={styles.address}></p>

        <h3 className={styles.subtitle}>Purchase History </h3>
        <ul className={styles.purchaseList}>
          {purchaseHistory &&
            purchaseHistory.map((purchase) => (
              <li key={purchase.id}>
                <p className={styles.purchaseInfo}>
                  Product: {purchase.product}
                </p>
                <p className={styles.purchaseInfo}>Price: {purchase.price}</p>
                <p className={styles.purchaseInfo}>Date: {purchase.date}</p>
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.types}>
        <Link to="/home">
          <button className={styles.button}>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
