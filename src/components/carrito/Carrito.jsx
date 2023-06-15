import React from "react";
import { useSelector } from "react-redux";
import Nav from '../Nav/Nav.jsx';
import axios from "axios";
import { FaSadTear } from 'react-icons/fa';
import CartProduct from "./cartProduct/CartProduct.jsx";
import { NavLink } from "react-router-dom";
import { TfiReload } from "react-icons/tfi";
import { Link } from "react-router-dom";

import styles from "./carrito.module.css";

export default function Carrito() {

  const id = useSelector((state) => state.idUsuario);

  console.log(id, "id");

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }

  const idUser = localStorage.getItem("ids");
  console.log(idUser);


  const cart = JSON.parse(localStorage.getItem("carritoLS"));
  // const idUser = localStorage.getItem("id");

  if (cart !== null && cart.length > 0) {
    var precioTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      precioTotal += (cart[i].price * cart[i].quantity);
    }
  }

  function eliminarObjetosRepetidos(array) {
    var objetosUnicos = [];

    array.forEach(function (objeto) {
      if (
        !objetosUnicos.some(function (item) {
          return item.id === objeto.id; // Compara las propiedades relevantes
        })
      ) {
        objetosUnicos.push(objeto);
      }
    });

    return objetosUnicos;
  }

  const productosUnicos = eliminarObjetosRepetidos(cart);


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
      console.log(body);
      const newOrder = await axios.post('/payment/create-order', body);

      console.log(newOrder.data.redirect);
      window.location.replace(newOrder.data.redirect);
    } else {
      alert('No hay usuario');
    }
  }

  return (
    <section>
      <section className={styles.componentCart} >
        <Nav />
        {cart === null || cart.length > 0 ?
          <div className={styles.containerCart}>
            {productosUnicos.map(product => {
              return (<CartProduct key={product.id} product={product} />)
            })}

            <div className={styles.carritoTotalPrecio} >
              <h3>Total del carrito: {precioTotal}</h3> <button onClick={funcionPago} >Proceder al pago</button>
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
