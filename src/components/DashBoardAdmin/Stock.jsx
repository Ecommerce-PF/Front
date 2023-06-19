import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Stock.module.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { getAllProducts } from "../../redux/actions/actions";

export default function Stock() {
  const dispatch = useDispatch();
  //const product = useSelector((state) => state.productDetail);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handlerButtonMore = async (event) => {
    const id = event.target.value;
    const updatedProducts = [...products]; // Crear una copia del array products

    const productToUpdate = updatedProducts.find((p) => p.id === id);
    if (productToUpdate) {
      productToUpdate.stock += 1; // Incrementar la cantidad de stock del producto en la copia
    }

    try {
      await axios.put(`/products/${id}`, productToUpdate);
      // Realizar acciones adicionales después de una respuesta exitosa aquí

      dispatch({ type: 'UPDATE_PRODUCTS', payload: updatedProducts }); // Actualizar el estado global de products
    } catch (error) {
      // Manejar el error aquí
    }
  };

  const handlerButtonLess = async (event) => {
    const id = event.target.value;
    const updatedProducts = [...products]; // Crear una copia del array products

    const productToUpdate = updatedProducts.find((p) => p.id === id);
    if (productToUpdate && productToUpdate.stock > 0) {
      productToUpdate.stock -= 1; // Decrementar la cantidad de stock del producto en la copia
    }

    try {
      await axios.put(`/products/${id}`, productToUpdate);
      // Realizar acciones adicionales después de una respuesta exitosa aquí

      dispatch({ type: 'UPDATE_PRODUCTS', payload: updatedProducts }); // Actualizar el estado global de products
    } catch (error) {
      // Manejar el error aquí
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch,products]);

  return (
    <>
      <h1>Esto es stock</h1>

      {products.map((product) => (
        <div className={styles.container} key={product.id}>
          <ul className={styles.ul}>
            <span className={styles.span}>{product.name}</span>
            <img className={styles.img} src={product.image} alt="" />
            <span className={styles.span}>{product.stock}</span>
            <span>Stock disponible</span>
          </ul>

          <div className={styles.buttonContainer}>
            <button
              value={product.id}
              onClick={handlerButtonMore}
              className={styles.button}
            >
              +
            </button>
            <button
              value={product.id}
              onClick={handlerButtonLess}
              className={styles.button}
            >
              -
            </button>
          </div>
        </div>
      ))}

                <Link to="/DashBoardAdmin">
                <button className={styles.button_back}>
                Back <FaArrowLeft className={styles.icon_back}></FaArrowLeft>
                </button>
              </Link>
    </>
  );
}
