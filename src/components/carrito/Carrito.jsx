import React from "react";
import Nav from '../Nav/Nav.jsx';
import { FaSadTear } from 'react-icons/fa';
import CartProduct from "./cartProduct/CartProduct.jsx";

import styles from "./carrito.module.css";

export default function Carrito() {
    return (
        <section>
            <Nav />
            {/* <section className={styles.emptyCart}>
                <div className={styles.cart}></div>
                <div className={styles.cartDescription}>
                    <h2>
                        Tu carrito de compras está vacio! <FaSadTear></FaSadTear>
                    </h2>
                </div>
            </section> */}
            <div className={styles.containerCart}>
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
                <CartProduct />
            </div>


        </section>
    );
}