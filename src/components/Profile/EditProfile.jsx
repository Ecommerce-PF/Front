
import { useState, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserAll, getUserById } from "../../redux/actions/actions";

// import UploadFile from "../UploadFile/UploadFile";

import styles from './EditProfile.module.css';

import axios from 'axios';

const EditProfile = () => {


    const navigate = useNavigate();

/************************************************************************** */
const id = useSelector((state) => state.idUsuario);

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }
  const idUser = localStorage.getItem("ids");  /* <-----------Para obtener el id del usuario*/


const [form, setForm] = useState({
    id: idUser,
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
    });
/************************************************************************************* */


const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserAll());
      await dispatch(getUserById(idUser));
    };
    fetchData();
  }, [dispatch, idUser]);

  const { name, email, phone, address, profileImage } = userId;


    /***************************** CLOUDINARY*********************************** */
   

      /**************************************************************** */

/*************************************************************************************** */
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));

    };


/*************************************************************************************** */
    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            axios.put(`/users/${idUser}`, form)
        
            .then((res) => {
                alert("information editada con exito");
                navigate("/profile")
         
            })
        } catch(error){
            alert(error);
        }
    };


    return (
        <>

<div className={styles.main_container}>


    <div  className={styles.form}>
      <h2 className={styles.form__group}>Profile</h2>
  
      <img className={styles.img_profile} src={profileImage} alt={name} />

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

{/* /*****************************************************************************************  */}


        <div className={styles.form__container}>
      

            <h1 className={styles.form__title}>Editar Perfil </h1>
        
        <form action="" onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.form__group}>
                <label htmlFor="name" className={styles.form__label} >Nombre</label>
                <input type="text" name="name" id="name" onChange={handleChange} value={form.name} className={styles.form__input} />
                <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
                <label htmlFor="lastName" className={styles.form__label}>userName</label>
                <input type="text" name="userName" id="lastName" onChange={handleChange} value={form.userName} className={styles.form__input} />
                <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
                <label htmlFor="email" className={styles.form__label}>Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={form.email} className={styles.form__input}/>
                <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
                <label htmlFor="phone" className={styles.form__label}>Phone</label>
                <input type="number" name="phone" id="phone" onChange={handleChange} value={form.phone} className={styles.form__input}/>
                <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
                <label htmlFor="password" className={styles.form__label}>Password</label>
                <input type="text" name="password" id="password" onChange={handleChange} value={form.password} className={styles.form__input}/>
                <span className={styles.form__line}></span>
            </div>

            <div className={styles.form__group}>
                <label htmlFor="profileImage" className={styles.form__label}>Imagen de Perfil</label>
                {/* <input type="file" name="profileImage" id="profileImage" onChange={handleChange} value={form.profileImage} className={styles.form__input} />  */}
                {/* <UploadFile name="profileImage" id="profileImage" onChange={handleChange} value={form.profileImage} className={styles.form__input} /> */}
                {/* <UploadFile handleUpload={handleUpload} folder={"user"}></UploadFile>  */}
                <span className={styles.form__line}></span>
              
            </div>

            <button type='submit' className={styles.form__submit}>Save Data</button>
       
        </form>


        </div>

    </div>

    </>
    )
}

export default EditProfile