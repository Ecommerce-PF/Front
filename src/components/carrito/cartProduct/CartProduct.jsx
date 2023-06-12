import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
// import { useDispatch } from 'react-redux';

import styles from "../carrito.module.css";

export default function CartProduct({ product }) {

    // const dispatch = useDispatch();

    const handleDelete = () => {
        // dispatch(deleteCart(product.id));
        const cart = JSON.parse(localStorage.getItem("carritoLS"));
        let deleteCart = cart.filter(e => {
            return e.id !== product.id;
        });
        localStorage.setItem("carritoLS", JSON.stringify(deleteCart));
        window.location.reload();
    }

    const [valueInp, setValueInp] = useState(product.quantity);

    const handleAddition = () => {
        setValueInp(valueInp + 1);
    }

    const handleSubtraction = () => {
        if (valueInp > 1) {
            setValueInp(valueInp - 1);
        }
    }

    return (

        <div className={styles.crtPrdct} >
            <img src={product.image} alt={product.name} className={styles.imgCarrito} />
            <div>
                <h2>{product.name}</h2>
                <h3>{product.category}</h3>
            </div>
            <div>
                <h3>Precio: ${product.price}</h3>
                <button className={styles.trash} onClick={handleDelete}>
                    <FaTrash style={{ color: "#d65757", }} />
                </button>
                <div className={styles.cantidadProducto}>
                    <button onClick={handleSubtraction} className={styles.bttnSub} >-</button>
                    <input className={styles.productAmout} type="text" value={valueInp} />
                    <button onClick={handleAddition} className={styles.bttnAdd} >+</button>
                </div>
            </div>
        </div>
    );
}