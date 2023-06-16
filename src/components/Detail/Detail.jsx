import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getDetail,
  addCart,
  getUserById,
} from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import styles from "./detail.module.css";


export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetail);
  const idUser = useSelector((state) => state.idUsuario);
  const user = useSelector((state) => state.userId);

  if (user.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("users", user.name);
  }
  const userOnline = localStorage.getItem("users");

  console.log(userOnline, "userOnline");

  const [comments, setComments] = useState([]);

  if (idUser.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("idUsers", idUser);
  }
  const idUsers = localStorage.getItem("ids");

  const fecha = {
    fecha: new Date(),
  };

  const [form, setForm] = useState({
    review: "",
    rating: 5,
    date: fecha.fecha + "",
    UserId: idUsers,
    ClotheId: id,
  });

  const hanleChange = (event) => {
    const value = event.target.value; // Corregir 'targer' a 'target'
    const name = event.target.name; // Corregir 'targer' a 'target'

    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${id}/reviews`);
        console.log(response.data, "response");
        setComments(response.data); // Asignar los comentarios a la variable 'comments'
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/products/${id}/reviews`, JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Formulario enviado correctamente");
    } catch (err) {
      alert(err);
    }
  };

  console.log(form);

  const handleAddCart = () => {
    dispatch(addCart(state));
    let listaCart = JSON.parse(localStorage.getItem("carritoLS"));
    if (listaCart === null) {
      listaCart = [];
    } else {
      for (var i = 0; i < listaCart.length; i++) {
        if (listaCart[i].id === state.id) {
          return Swal.fire({
            icon: "error",
            title: "To producto ya se encuentra en Carrito!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }

      listaCart.push({
        ...state,
        quantity: 1,
      });
    }
    localStorage.setItem("carritoLS", JSON.stringify(listaCart));

    Swal.fire({
      icon: "success",
      title: "Su producto se ha agregado al carrito!!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getUserById(idUsers));
  }, [dispatch, id]);

  //Logica de galeria img
  const [colorProductImg, setColorProductImg] = useState('');
  const [coloresPrt, setColoresPrt] = useState([]);

  function handleChange(e) {
    console.log(e.target.value)
    if (e.target.value === 'None') {
      setColoresPrt([])
    } else {
      (setColorProductImg(e.target.value));
      setColoresPrt(clrPrdct(e.target.value));
    }
  }

  // console.log(coloresPrt);

  const clrPrdct = (valorBuscado) => {
    var arrayColorEncontrado = null;

    for (var i = 0; i < state.color.length; i++) {
      if (state.color[i].ColorName === valorBuscado) {
        arrayColorEncontrado = state.color[i].ProductImages;
        // console.log(arrayColorEncontrado);
        return arrayColorEncontrado;
      }
    }
  }

  useEffect(() => {
    // setColorProductImg()
  }, [])

  return (
    <div className={styles.back}>
      <div className={styles.mainContainer}>
        <div className={styles.productImg}>
          <h3>{state?.name}</h3>
          <div className={styles.img}>

            {/* Render de imagen  si hay imagenes en e array renderizamos el array si no, mandamos la imagen que tenemos.*/}
            {/* {!!coloresPrt.length ? */}
            {/* <NoTransitionExample coloresPrt={coloresPrt} /> : */}
            <img
              src={state?.image}
              alt={state?.name}
              className={styles.imgProducto}
            />
            {/* } */}


          </div>
          <div className={styles.buyNow}>
            <h1>${state?.price}</h1>
          </div>

          <div className={styles.details}>
            <div className={styles.description}>
              <div
                className={styles.textss}
                dangerouslySetInnerHTML={{ __html: state?.description }}
              ></div>
            </div>
            <div className={styles.cart}>
              <button className={styles.button} onClick={handleAddCart}>
                Add to Cart{" "}
                <FaCartArrowDown className={styles.icon}></FaCartArrowDown>
              </button>
              <NavLink to="/home">
                <button className={styles.button}>
                  Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.back2}>
        {comments.map((comment) => (
          <div className={styles.reviewss} key={comment.id}>
            <p className={styles.info}>Review: {comment.review}</p>
            <p className={styles.info}>Rating:</p>
            {Array.from({ length: comment.rating }).map((_, index) => (
              <svg
                className={styles.stars}
                key={index}
                width="0px"
                height="20px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 4L15.2747 9.8691L21.5595 10.2188L16.6806 14.1959L18.2901 20.2812L13 16.87L7.70993 20.2812L9.31941 14.1959L4.44049 10.2188L10.7253 9.8691L13 4Z"
                  stroke="#121923"
                  strokeWidth="1.2"
                />
              </svg>
            ))}
            <p className={styles.info}>
              Hour:
              <p className={styles.info}>
                {new Date(comment.date).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </p>
            </p>
          </div>
        ))}
      </div>

      <h1>Agregue su comentario</h1>
      <form action="" onSubmit={submitHandler}>
        <div className={styles.enviarBut}>
          <label htmlFor="">Review</label>

          <input
            name="review"
            value={form.review}
            onChange={hanleChange}
            className={styles.inputC}
            type="text"
          ></input>

          <label htmlFor="">Rating</label>

          <input
            name="rating"
            value={form.rating}
            onChange={hanleChange}
            className={styles.inputC}
            type="range"
            min="1"
            max="5"
            step="1"
          />

          <span>{form.rating}</span>

          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
