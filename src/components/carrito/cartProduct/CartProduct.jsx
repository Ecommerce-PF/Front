import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

import styles from "../carrito.module.css";

export default function CartProduct() {

    const [valueInp, setValueInp] = useState(1);

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
            <h2>Producto</h2>
            <h3>Descripción del producto</h3>
            <div>
                <h3>Precio: $999.99</h3>
                <FaTrash className={styles.trash} style={{color: "#d65757",}} />
                <div className={styles.cantidadProducto}>
                    <button onClick={ handleSubtraction} className={styles.bttnSub} >-</button>
                    <input className={styles.productAmout} type="text" value={valueInp} />
                    <button onClick={handleAddition} className={styles.bttnAdd} >+</button>
                </div>
            </div>
        </div>
    );
}