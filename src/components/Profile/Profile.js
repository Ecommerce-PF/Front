import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { getUserAll } from "../../redux/actions/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const id = useSelector((state) => state.idUsuario);

  const [loading, setLoading] = useState(true);
  const [userOnline, setUserOnline] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserAll());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user && user.length > 0) {
      setUserOnline(user[user.length - 1]);
    }
  }, [user]);

  console.log(userOnline, "hola");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userOnline) {
    return null; // O redirige al usuario a la página de inicio de sesión u otra página apropiada
  }

  const { name, email, password, phone, address, purchaseHistory } = userOnline;

  return (
    <div>
      <h2 className={styles.title}>Profile</h2>
      <p className={styles.info}>Name: {name}</p>
      <p className={styles.info}>Username: {userOnline.userName}</p>
      <p className={styles.info}>Email: {email}</p>
      <p className={styles.info}>Password: {password}</p>
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
    </div>
  );
};

export default Profile;
