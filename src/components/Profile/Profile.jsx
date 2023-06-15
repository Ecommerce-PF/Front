import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { getUserAll, getUserById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import UploadFile from "../UploadFile/UploadFile";
import axios from "axios";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const id = useSelector((state) => state.idUsuario);
  const [url, setUrl] = useState("");


  const handleUpload = async (error, result) => {
    if (result && result.event === "success") {
      setUrl(result.info.secure_url);
      await axios.put(`/users/1`, { profileImage: result.info.secure_url });
      console.log({ profileImage: url });
    }
  };

  {
    /* <UploadFile handleUpload={handleUpload} folder={'user'}/> */
  }

  console.log(userId, "id");


  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }

  const idUser = localStorage.getItem("ids");


  console.log(url, "idUser");

  useEffect(() => {
    setUrl(userId.profileImage);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserAll());
      await dispatch(getUserById(idUser));
    };
    fetchData();
  }, [dispatch, idUser, url]);

  const { name, email, phone, address, purchaseHistory, profileImage } = userId;

  return (
    <div>
      <div>
        <h2 className={styles.title}>Profile</h2>
        <div>
          <img src={url} alt="profilePicture" width="190" height="200"></img>
          <p></p>
          <UploadFile handleUpload={handleUpload} folder={"user"}></UploadFile>
        </div>
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
                <p className={styles.purchaseInfo}>
                  Product: {purchase.product}
                </p>
                <p className={styles.purchaseInfo}>Price: {purchase.price}</p>
                <p className={styles.purchaseInfo}>Date: {purchase.date}</p>
              </li>
            ))}
        </ul>
      </div>

      <Link to="/home">
        <button className={styles.button}>
          Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
        </button>
      </Link>

            <Link to={`/editProfile`}>
            <button className={styles.button}>
              Edit Profile</button>
            </Link>

    </div>
  );
};

export default Profile;
