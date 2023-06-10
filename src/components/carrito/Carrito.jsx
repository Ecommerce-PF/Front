import React, { useState, useEffect } from "react";
import Nav from '../Nav/Nav.jsx';
import { FaSadTear } from 'react-icons/fa';
import CartProduct from "./cartProduct/CartProduct.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from "./carrito.module.css";

export default function Carrito() {

    const cart = useSelector(state => state.cart);
    console.log(cart);

    return (
        <section>
            <Nav />
            {cart.lenght > 0 ?
                <div className={styles.containerCart}>
                    {cart.map(product => {
                        return (<CartProduct key={product.id} product={product} />)
                    })}
                    {/* <CartProduct /> */}
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
                    </div>
                </section>
            }




        </section>
    );
}