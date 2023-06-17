import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../redux/actions/actions.js";

import { FaArrowLeft } from "react-icons/fa";
import styles from "./Delete.module.css";
import Swal from 'sweetalert2';

export default function Delete() {
  const [borrar, setBorrar] = useState(false);
  const [errors, setErrors] = useState({ noInputs: "No hay inputs" });
  const [input, setInputs] = useState({ id: "" });
  const [selectedProductName, setSelectedProductName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = function (e) {
    const productId = e.target.value;
    const product = getProductById(productId);
    const productName = product?.name;
    setErrors(validate({ ...input, id: productId }));
    setInputs({ id: productId });
    setSelectedProductName(productName);
  };

  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  function toggle() {
    setBorrar(!borrar);
  }

  function deletee(e, input) {
    dispatch(deleteProduct(input.id));
    setInputs({ id: "" });
    setBorrar(false);
    setShowAlert(true);
    setSelectedProductName("");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  function getProductById(productId) {
    return products.find(product => product.id === productId);
  }

  var danger = {
    marginTop: '7px',
    display: 'block',
    color: 'red',
    fontSize: '13px'
  };

  var imgStyle = {
    width: '200px', // Ajusta el tamaño según lo necesario
    height: 'auto',
    margin: '10px',
  };

  function confirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletee(null, input);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  return (
    <>
      <div className="container text-center d-flex justify-content-center align-items-center">
        <form className="m-5">
          <select
            name="id"
            className="btn btn-light dropdown-toggle m-3"
            value={input.id}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              SELECCIONAR PRENDA
            </option>
            {products.map((product) => {
              return (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              );
            })}
          </select>
          {errors.id && <p style={danger}>{errors.id}</p>}


 {/******************** * Renderizar la información de la prenda seleccionada ***********************************/}


          {selectedProductName && (
            <div className="card-body">
              <img
                src={getProductById(input.id)?.image}
                alt="Product"
                className="card-img-top"
                style={imgStyle}
              />
              <p className="card-text">
                Usted va a eliminar definitivamente esta prenda. ¿Seguro que desea hacerlo?
              </p>
            </div>
          )}
        </form>
        <button
          className="btn btn-warning d-print-block p-2"
          onClick={confirmDelete}
          disabled={isNotEmpty(errors)}
        >
          Borrar producto
        </button>
        {borrar && (
          <div className="container">
            <div className="row">
              <div className="col align-self-center">
                <div className="card-body">
                  <button className="btn btn-danger" onClick={toggle}>
                    No
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={confirmDelete}
                    type="submit"
                  >
                    Sí
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAlert && selectedProductName && (
          <div className="alert alert-success mt-3" role="alert">
            ¡La prenda {selectedProductName} ha sido borrada exitosamente!
          </div>
        )}
      </div>

      <Link to="/DashBoardAdmin">
        <button className={styles.button}>
          Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
        </button>
      </Link>
    </>
  );
}

export function validate(input) {
  let errors = {};
  if (!input.id) errors.id = "Seleccione una prenda para borrar";
  return errors;
}
