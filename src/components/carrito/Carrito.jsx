import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Nav/Nav.jsx";
import axios from "axios";
import { FaSadTear } from "react-icons/fa";
import CartProduct from "./cartProduct/CartProduct.jsx";
import { NavLink, Link } from "react-router-dom";
import { getCart } from "../../redux/actions/actions.js";
import Swal from "sweetalert2";
import styles from "./carrito.module.css";

export default function Carrito() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.idUsuario);
  const iniciado = useSelector((state) => state.iniciado);

  if (iniciado.length === 0) {
  } else {
    localStorage.setItem("iniciado", iniciado);
  }

  const iniciados = localStorage.getItem("iniciado");

  if (!id.length === 0) localStorage.setItem("ids", id);
  const idUser = localStorage.getItem("ids");

  const carritoState = useSelector((state) => state.cart);

  if (carritoState !== null && carritoState.length > 0) {
    var precioTotal = 0;
    for (let i = 0; i < carritoState.length; i++)
      precioTotal += carritoState[i].price * carritoState[i].quantity;
  }

  const funcionPago = async () => {
    if (!!idUser) {
      var arrProducts = [];
      for (let i = 0; i < carritoState.length; i++) {
        arrProducts.push({
          id: carritoState[i].id,
          quantity: carritoState[i].quantity,
        });
      }
      const body = {
        products: arrProducts,
        userId: parseInt(idUser),
      };
      const newOrder = await axios.post("/payment/create-order", body);
      window.location.replace(newOrder.data.redirect);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes que iniciar sesion para poder realizar esta compra!",
        footer: '<a href="./login">Inicia sesion aquí</a>',
      });
    }
  };

  const Login = () => {
    Swal.fire({
      icon: "error",
      title: "Session not started",
      text: "You must log in or register to continue with the purchase!",
      footer: '<a href="./login">Inicia sesion aquí</a>',
    });
  };

  const [defaultCart, setDefaultCart] = useState(true);

  useEffect(() => {
    if (defaultCart) {
      dispatch(getCart());
      setDefaultCart(false);
    }
  }, [defaultCart, dispatch]);

  return (
    <section className={styles.componentCart2}>
      <section className={styles.componentCart}>
        <Nav />
        {carritoState === null || carritoState.length > 0 ? (
          <div className={styles.containerCart}>
            {carritoState.map((product) => {
              return (
                <CartProduct
                  key={product.id}
                  product={product}
                  stock={product.stock}
                />
              );
            })}

            <div className={styles.carritoTotalPrecio}>
              <div className={styles.containerTotalpays}>
                <p className={styles.totalPay}>Total Cart: </p>
                <div className={styles.containerPrice}>
                  $ {precioTotal?.toFixed(2)}
                </div>
              </div>
              {iniciados === "no" ? (
                <button className={styles.button_confirm} onClick={Login}>
                  Log in
                </button>
              ) : (
                <button className={styles.button_confirm} onClick={funcionPago}>
                  Proceed to payment
                  <svg
                    className={styles.svgcarrito}
                    width="40px"
                    height="40px"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 10.5H5L6.5 19.5H18.5L20 10.5H16.5M8.5 10.5L10.2721 5.18377C10.4082 4.77543 10.7903 4.5 11.2208 4.5H13.7792C14.2097 4.5 14.5918 4.77543 14.7279 5.18377L16.5 10.5M8.5 10.5H16.5"
                      stroke="#121923"
                      stroke-width="1.2"
                    />
                    <path
                      d="M12.5 10.5V19.5"
                      stroke="#121923"
                      stroke-width="1.2"
                    />
                    <path
                      d="M9.5 19.5L8.5 10.5"
                      stroke="#121923"
                      stroke-width="1.2"
                    />
                    <path
                      d="M15.5 19.5L16.5 10.5"
                      stroke="#121923"
                      stroke-width="1.2"
                    />
                    <path
                      d="M19.5 13.5H5.5"
                      stroke="#121923"
                      stroke-width="1.2"
                    />
                    <path d="M19 16.5H6" stroke="#121923" stroke-width="1.2" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ) : (
          <section className={styles.emptyCart}>
            <div className={styles.cart}></div>
            <div className={styles.cartDescription}>
              <h2>
                Your shopping cart is empty! <FaSadTear></FaSadTear>
              </h2>
              <NavLink to="/home">
                <button className={styles.button}>Search for articles</button>
              </NavLink>
            </div>
          </section>
        )}
        
      </section>
      <div className={styles.containerButton}> 
          <Link className={styles.types} to="/home">
            <button className={styles.button}>
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 17L10 12.5L14.5 8"
                  stroke="#121923"
                  stroke-width="1.2"
                />
              </svg>

              <p className={styles.divA}>Back</p>
            </button>
          </Link>
        </div>
    </section>
  );
}
