import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from '../Nav/Nav.jsx';
import axios from "axios";
import { FaSadTear } from 'react-icons/fa';
import CartProduct from "./cartProduct/CartProduct.jsx";
import { NavLink, Link } from "react-router-dom";
import { TfiReload } from "react-icons/tfi";
// import { getCart } from '../../redux/actions/actions.js'
import Swal from "sweetalert2";
import styles from "./carrito.module.css";

export default function Carrito() {

  // const dispatch = useDispatch();

  const id = useSelector((state) => state.idUsuario);
  if (!id.length === 0) localStorage.setItem("ids", id);
  const idUser = localStorage.getItem("ids");

  const cart = JSON.parse(localStorage.getItem("carritoLS"));

  if (cart !== null && cart.length > 0) {
    var precioTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      precioTotal += (cart[i].price * cart[i].quantity);
    }
  }

  const funcionPago = async () => {
    if (!!idUser) {
      var arrProducts = [];
      for (let i = 0; i < cart.length; i++) {
        arrProducts.push({
          id: cart[i].id,
          quantity: cart[i].quantity,
        });
      }
      const body = {
        "products": arrProducts,
        "userId": parseInt(idUser)
      }
      const newOrder = await axios.post('/payment/create-order', body);
      window.location.replace(newOrder.data.redirect);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes que iniciar sesion para poder realizar esta compra!',
        footer: '<a href="./login">Inicia sesion aquí</a>'
      })
    }
  }

  // console.log(carritoState)

  return (
    <section>
      <section className={styles.componentCart} >
        <Nav />
        {cart === null || cart.length > 0 ?
          <div className={styles.containerCart}>
            {cart.map(product => {
              return (<CartProduct key={product.id} product={product} />)
            })}

            <div className={styles.carritoTotalPrecio} >
              <h3>Total del carrito: {precioTotal?.toFixed(2)}</h3> <button onClick={funcionPago} >Proceder al pago</button>
            </div>
          </div> :
          <section className={styles.emptyCart}>
            <div className={styles.cart}></div>
            <div className={styles.cartDescription}>
              <h2>
                Tu carrito de compras está vacio! <FaSadTear></FaSadTear>
              </h2>
              <NavLink to='/home'>
                <button>Buscar articulos</button>
              </NavLink>
              <button onClick={() => window.location.reload()} > <TfiReload /> </button>
            </div>
          </section>
        }

        <div className={styles.types}>
          <Link to="/home">
            <button className={styles.button}>Back</button>
          </Link>
        </div>
      </section>

    </section>
  );
}
