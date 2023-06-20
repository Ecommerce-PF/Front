import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteCart, updatedCart } from '../../../redux/actions/actions.js';

import styles from "../carrito.module.css";

export default function CartProduct({ product, stock }) {
  const dispatch = useDispatch();
  const [valueInp, setValueInp] = useState(parseInt(product.quantity));
  const [isMaxStock, setIsMaxStock] = useState(valueInp >= stock);
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
    if (valueInp < stock) {
      const newValue = valueInp + 1;
      setValueInp(newValue);
      setIsMaxStock(newValue >= stock);
      modificarObjetoPorId(cart, product.id, { ...product, quantity: newValue })
      dispatch(updatedCart(cart));
    }
  }

  const handleSubtraction = () => {
    if (valueInp > 1) {
      const newValue = valueInp - 1;
      setValueInp(newValue);
      setIsMaxStock(newValue >= stock);
      modificarObjetoPorId(cart, product.id, { ...product, quantity: newValue })
      dispatch(updatedCart(cart));
    }
  }

  return (
    <div className={styles.crtPrdct}>
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
          <button onClick={handleSubtraction} className={styles.bttnSub}>-</button>
          <input className={styles.productAmout} type="text" value={valueInp} readOnly />
          <button onClick={handleAddition} className={styles.bttnAdd} disabled={isMaxStock}>+</button>
        </div>
      </div>
    </div>
  );
}
