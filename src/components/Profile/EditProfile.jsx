import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAll, getUserById } from "../../redux/actions/actions";
import UploadFile from "../UploadFile/UploadFile";
import styles from "./EditProfile.module.css";
import axios from "axios";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.idUsuario);
  const idUser =
    localStorage.getItem("ids"); /* <-----------Para obtener el id del usuario*/
  const userId = useSelector((state) => state.userId);
  const { name, userName, email, phone, address, password, profileImage } =
    userId;
  const [url, setUrl] = useState(profileImage);

  useEffect(() => {
    setUrl(userId.profileImage);
  }, []);

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }

  const [form, setForm] = useState({
    id: idUser,
    name,
    userName,
    phone,
    email,
    password,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUserAll());
      dispatch(getUserById(idUser));
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(form);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${idUser}`, form).then((res) => {
        alert("information editada con exito");
        navigate("/profile");
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleUpload = async (error, result) => {
    if (result && result.event === "success") {
      setUrl(result.info.secure_url);
      setForm({ ...form, profileImage: result.info.secure_url });
    }
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.form}>
          <h2 className={styles.form__group}>Profile</h2>

          <div>
            <img src={url} alt="profilePicture" width="190" height="200"></img>
            <p></p>
          </div>

          <p className={styles.info}>Name: </p>
          <h2>{name}</h2>
          <p className={styles.info}>Username:</p>
          <h2> {userId.userName}</h2>
          <p className={styles.info}>Email: </p>
          <h3>{email}</h3>
          <p className={styles.info}>Phone: </p>
          <h3>{phone}</h3>

          <p className={styles.subtitle}>Address {address}</p>
          <h3 className={styles.address}> Voy caminando por el mundo</h3>
        </div>

        <div className={styles.form__container}>
          <h1 className={styles.form__title}>Editar Perfil </h1>
          <form action="" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__group}>
              <label htmlFor="name" className={styles.form__label}>
                Name =
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={form.name}
                className={styles.form__input}
              />
              <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
              <label htmlFor="lastName" className={styles.form__label}>
                User Name =
              </label>
              <input
                type="text"
                name="userName"
                id="lastName"
                onChange={handleChange}
                value={form.userName}
                className={styles.form__input}
              />
              <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
              <label htmlFor="email" className={styles.form__label}>
                Email =
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email}
                className={styles.form__input}
              />
              <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
              <label htmlFor="phone" className={styles.form__label}>
                Phone =
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={form.phone}
                className={styles.form__input}
              />
              <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
              <label htmlFor="password" className={styles.form__label}>
                Password =
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password}
                className={styles.form__input}
              />
              <span className={styles.form__line}></span>
            </div>
            <UploadFile
              handleUpload={handleUpload}
              folder={"user"}
            ></UploadFile>

            <button type="submit" className={styles.form__submit}>
              Save Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
