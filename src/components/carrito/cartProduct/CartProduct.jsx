import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteCart, updatedCart } from '../../../redux/actions/actions.js';

import styles from "../carrito.module.css";

export default function CartProduct({ product }) {

    const dispatch = useDispatch();
    const [valueInp, setValueInp] = useState(parseInt(product.quantity));
    const cart = JSON.parse(localStorage.getItem("carritoLS"));

    const handleDelete = () => {
        let deleteCartArray = cart.filter(e => e.id !== product.id);
        dispatch(deleteCart(deleteCartArray));
    }

    function modificarObjetoPorId(arreglo, id, nuevosDatos) {
        const indice = arreglo.findIndex(objeto => objeto.id === id);
        if (indice !== -1) arreglo[indice] = { ...arreglo[indice], ...nuevosDatos };
    }

    const handleAddition = () => {
        setValueInp(parseInt(valueInp + 1));
        modificarObjetoPorId(cart, product.id, { ...product, quantity: valueInp + 1, })
        dispatch(updatedCart(cart));
    }

    const handleSubtraction = () => {
        if (valueInp > 1) {
            setValueInp(parseInt(valueInp - 1));
            modificarObjetoPorId(cart, product.id, { ...product, quantity: valueInp - 1, })
            dispatch(updatedCart(cart));
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