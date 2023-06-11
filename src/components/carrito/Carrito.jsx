import React from "react";
import Nav from '../Nav/Nav.jsx';
import { FaSadTear } from 'react-icons/fa';
import CartProduct from "./cartProduct/CartProduct.jsx";
import { NavLink } from 'react-router-dom';
import { TfiReload } from 'react-icons/tfi'

import styles from "./carrito.module.css";

export default function Carrito() {

    const cart = JSON.parse(localStorage.getItem("carritoLS"));
    // console.log(cart);

    if (cart !== null && cart.length > 0) {
        var precioTotal = 0;
        for (let i = 0; i < cart.length; i++) {
            precioTotal += cart[i].price;
        }
    }

    function eliminarObjetosRepetidos(array) {
        var objetosUnicos = [];
      
        array.forEach(function(objeto) {
          if (!objetosUnicos.some(function(item) {
            return item.id === objeto.id; // Compara las propiedades relevantes
          })) {
            objetosUnicos.push(objeto);
          }
        });
      
        return objetosUnicos;
      }

    const productosUnicos = eliminarObjetosRepetidos(cart);
    console.log(productosUnicos)

    return (
        <section className={styles.componentCart} >
            <Nav />
            {cart === null || cart.length > 0 ?
                <div className={styles.containerCart}>
                    {productosUnicos.map(product => {
                        return (<CartProduct key={product.id} product={product} />)
                    })}

                    <div className={styles.carritoTotalPrecio} >
                        <h3>Total del carrito: {precioTotal}</h3> <button onClick={() => alert("En producción")} >Proceder al pago</button>
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




        </section>
    );
}