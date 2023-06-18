import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from '../../../redux/actions/actions.js';

import styles from "../carrito.module.css";

export default function CartProduct({ product }) {

    const dispatch = useDispatch();
    const [updateCart, setUpdateCart] = useState(false);
    const [valueInp, setValueInp] = useState(parseInt(product.quantity));
    const [producto, setProducto] = useState([]);
    const carritoState = useSelector((state) => state.cart);
    const cart = JSON.parse(localStorage.getItem("carritoLS"));
    console.log(cart)

    const handleDelete = () => {
        let deleteCartArray = cart.filter(e => e.id !== product.id);
        dispatch(deleteCart(deleteCartArray));
        // localStorage.setItem("carritoLS", JSON.stringify(deleteCart));
        // window.location.reload();
    }

    function modificarObjetoPorId(arreglo, id, nuevosDatos) {
        const indice = arreglo.findIndex(objeto => objeto.id === id);
        if (indice !== -1) arreglo[indice] = { ...arreglo[indice], ...nuevosDatos };
    }

    const handleAddition = () => {
        setValueInp(parseInt(valueInp + 1));
        modificarObjetoPorId(cart, product.id, { ...product, quantity: valueInp + 1, })
        localStorage.setItem("carritoLS", JSON.stringify(cart));
        window.location.reload();
    }

    const handleSubtraction = () => {
        if (valueInp > 1) {
            setValueInp(parseInt(valueInp - 1));
            modificarObjetoPorId(cart, product.id, { ...product, quantity: valueInp - 1, })
            localStorage.setItem("carritoLS", JSON.stringify(cart));
            window.location.reload();
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