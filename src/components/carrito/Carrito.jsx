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

  console.log(iniciado, "esto es el global");

  if (iniciado.length === 0) {
  } else {
    localStorage.setItem("iniciado", iniciado);
  }

  const iniciados = localStorage.getItem("iniciado");

  console.log(iniciados, "esto es el store");

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
      title: "Sesion no iniciada",
      text: "Debe iniciar sesion o registrarse para continuar con la compra!",
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
    <section>
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
              <h3>Total del carrito: {precioTotal?.toFixed(2)}</h3>
              {iniciados === "no" ? (
                <button className={styles.button_confirm} onClick={Login}>
                  Inicie sesion
                </button>
              ) : (
                <button className={styles.button_confirm} onClick={funcionPago}>
                  Proceder al pago
                </button>
              )}
            </div>
          </div>
        ) : (
          <section className={styles.emptyCart}>
            <div className={styles.cart}></div>
            <div className={styles.cartDescription}>
              <h2>
                Tu carrito de compras está vacio! <FaSadTear></FaSadTear>
              </h2>
              <NavLink to="/home">
                <button className={styles.button}>Buscar articulos</button>
              </NavLink>
            </div>
          </section>
        )}

        <div className={styles.types}>
          <Link to="/home">
            <button className={styles.button}>Back</button>
          </Link>
        </div>
      </section>
    </section>
  );
}
