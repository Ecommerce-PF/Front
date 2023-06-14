import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { getDetail, addCart } from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";
// import { NoTransitionExample } from "./Carrousel/Carrusel.jsx"

import styles from "./detail.module.css";

// Carousel
export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetail);

  const handleAddCart = () => {
    dispatch(addCart(state));
    let listaCart = JSON.parse(localStorage.getItem("carritoLS"));
    if (listaCart === null) {
      listaCart = [];
    } else {
      for (var i = 0; i < listaCart.length; i++) {
        if (listaCart[i].id === state.id) {
          return (Swal.fire({
            icon: 'error',
            title: 'To producto ya se encuentra en Carrito!',
            showConfirmButton: false,
            timer: 1500
          }))
        }
      }

      listaCart.push({
        ...state,
        quantity: 1
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
  }, [dispatch, id]);

  //Logica de galeria img
  const [colorProductImg, setColorProductImg] = useState('');
  const [coloresPrt, setColoresPrt] = useState([]);

  function handleChange(e) {
    console.log(e.target.value)
    if(e.target.value === 'None'){
      setColoresPrt([])
    }else{
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

          <div className={styles.containerSA}>
            <label htmlFor="color">Color:</label>
            <select className={styles.buttonSelect} type="select" name="color" onChange={handleChange}>
              <option className={styles.option}>None</option>
              {state?.color &&
                state.color.map((e) => (
                  <option
                    className={styles.option}
                    name={e.ColorName}
                    key={e.ColorName}
                  >
                    {e.ColorName}
                  </option>
                ))}
            </select>
            <div>
              <label htmlFor="color">Size:</label>
              <button className={styles.size}>S</button>
              <button className={styles.size}>M</button>
              <button className={styles.size}>L</button>
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.description}>
            <div className={styles.textss}
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
  );
}
