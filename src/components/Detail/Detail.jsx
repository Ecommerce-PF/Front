import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import { getDetail, addCart } from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";

import styles from "./detail.module.css";

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
        // Comparar el valor buscado con el objeto actual
        if (listaCart[i].id === state.id) {
          return (Swal.fire({
            icon: 'error',
            title: 'To producto ya se encuentra en la lista de reproducción!',
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
      title: "Su producto se a agregado al carrito!!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const [input, setInput] = useState(1);

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let listaCart = JSON.parse(localStorage.getItem("carritoLS"));

    if (listaCart === null) {
      listaCart = [];
    } else {
      // Recorrer el array de objetos
      for (var i = 0; i < listaCart.length; i++) {
        // Comparar el valor buscado con el objeto actual
        if (listaCart[i].id === state.id) {
          return (Swal.fire({
            icon: 'error',
            title: 'To producto ya se encuentra en la lista de reproducción!',
            showConfirmButton: false,
            timer: 1500
          }))
        }
      }
      listaCart.push({
        ...state,
        quantity: input,
      });
      localStorage.setItem("carritoLS", JSON.stringify(listaCart));

      Swal.fire({
        icon: 'success',
        title: 'Su producto se a agregado al carrito!!',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }

  // console.log({
  //   ...state,
  //   quantity: input,
  // });

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.back}>
      <div className={styles.mainContainer}>
        <div className={styles.productImg}>
          <h3>{state?.name}</h3>
          <div className={styles.img}>
            <img
              src={state?.image}
              alt={state?.name}
              className={styles.imgProducto}
            />
          </div>
          <div className={styles.buyNow}>
            <h1>${state?.price}</h1>
          </div>

          <div className={styles.containerSA}>
            <label htmlFor="color">Color:</label>
            <select className={styles.buttonSelect} type="select" name="color">
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
