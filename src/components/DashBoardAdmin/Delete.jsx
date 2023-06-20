import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../redux/actions/actions.js";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./Delete.module.css";
import Swal from "sweetalert2";
import axios from "axios";

export default function Delete() {
  const [borrar, setBorrar] = useState(false);
  const [errors, setErrors] = useState({ noInputs: "No hay inputs" });
  const [input, setInputs] = useState({ id: "" });
  const [input2, setInputs2] = useState({ id: "" });
  const [input3, setInputs3] = useState({ id: "" });
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductNames2, setSelectedProductNames2] = useState("");
  const [selectedProductNames3, setSelectedProductNames3] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = function (e) {
    const productId = e.target.value;
    const product = getProductById(productId);
    const productName = product.name;
    setErrors(validate({ ...input, id: productId }));
    setInputs({ id: productId });
    setSelectedProductName(productName);
  };

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productsNotAvailable = products.filter((product) => !product.isAvaible);
  const productsIsAvailable = products.filter((product) => product.isAvaible);

  function toggle() {
    setBorrar(!borrar);
  }

  function deletee(input) {
    dispatch(deleteProduct(input.id));
    setInputs2({ id: "" });
    setBorrar(false);
    setShowAlert(true);
    setSelectedProductName("");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  const handleDespausarProducto = async (e) => {
    const productIds = e?.target.value;
    const productImg = getProductById(productIds);
    const productNames = productImg?.name;
    const pausado = { ...productImg, isAvaible: true };
    setInputs3({ id: productIds });
    setSelectedProductNames3(productNames);
    try {
      await axios.put(`/products/${input3.id}`, pausado );  
    } catch (error) {
      console.log(error);
    }
  };

  const handlePausarProducto = async (e) => {
    const productIds = e?.target.value;
    const productImg = getProductById(productIds);
    const productNames = productImg?.name;
    const pausado = { ...productImg, isAvaible: false };
    setInputs2({ id: productIds });
    setSelectedProductNames2(productNames);
    try {
      const response = await axios.put(`/products/${input2.id}`,pausado);
      // Realiza acciones adicionales después de la respuesta exitosa aquí
    } catch (error) {
      // Maneja el error aquí
    }
  };

  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  function getProductById(productId) {
    return products.find((product) => product.id === productId);
  }

  var danger = {
    marginTop: "7px",
    display: "block",
    color: "red",
    fontSize: "13px",
  };

  var imgStyle = {
    width: "200px", // Ajusta el tamaño según lo necesario
    height: "auto",
    margin: "10px",
  };

  function confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletee(input);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        window.location.reload();
      }
    });
  }

  

  function confirmPause() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will to get this clothe out from your avaiable stock !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to do!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Desactivada!", "The Clothe have been pick out from estock", "success");
        handlePausarProducto();
        window.location.reload();
      }
    });
  }

  function confirmDespause() {
    Swal.fire({
      title: "Are you sure?",
      text: "You would ike to List this Clothe Again?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Active Again!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Active!", "Your Clothe is Active Again", "Success");
        handleDespausarProducto();
        window.location.reload();
      }
    });
  }


  return (
    <>
    
    <div className={styles.container}>
      {/* ================================================================================ */}
      {/* BORRAR PRODUCTO */}

      <div className={styles.delete}>
        <form className="m-5">
          <select
            name="id"
            className="btn btn-light dropdown-toggle m-3"
            value={input.id}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              SELECT PRODUCT
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

          {selectedProductName && (
            <div className="card-body">
              <img
                src={getProductById(input.id)?.image}
                alt="Product"
                className="card-img-top"
                style={imgStyle}
              />
              <p className="card-text">
                You would like to delte this product permanently?
              </p>
            </div>
          )}
        </form>

        <button
          className="btn btn-warning d-print-block p-2"
          onClick={confirmDelete}
          disabled={isNotEmpty(errors)}>
            
             Delete Product
             
             </button>
        {borrar && (
          <div className="container">
            <div className="row">
              <div className="col align-self-center">
                <div className="card-body">
                  <button className="btn btn-danger" onClick={toggle}>
                    Not
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={confirmDelete}
                    type="submit"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAlert && selectedProductName && (
          <div className="alert alert-success mt-3" role="alert">
            ¡The clothe  {selectedProductNames2} have been erase succesufully!
          </div>
        )}
      </div>

      {/* ================================================================================ */}
      {/* PAUSAR PRODUCTO */}

      <div className={styles.containerPause}>
        <form className="m-5">
          <select name="id" value={input2.id} onChange={handlePausarProducto}>
            <option value="" disabled>
              SELECT PRODUCT
            </option>
            {productsIsAvailable.map((product) => {
              return (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              );
            })}
          </select>

          {selectedProductNames2 && (
            <div className="card-body">
              <img
                src={getProductById(input2.id)?.image}
                alt="Product"
                className="card-img-top"
                style={imgStyle}
              />
              <p className="card-text">
                Usted va a desactivar la prenda, ¿está seguro?
              </p>
            </div>
          )}
        </form>

        <button
          className="btn btn-warning d-print-block p-2"
          onClick={confirmPause}
          // disabled={isNotEmpty(errors)}
        >
          Pick Off
        </button>

        {false && (
          <div className="container">
            <div className="row">
              <div className="col align-self-center">
                <div className="card-body">
                  <button className="btn btn-danger" onClick={toggle}>
                    Do not
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={confirmPause}
                    type="submit"
                  >
                    Yes!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------------- */}
      {/* DESPAUSAR */}

      <div className={styles.containerDespause}>
        <form className="m-5">
          <select
            name="id"
            value={input3.id}
            onChange={handleDespausarProducto}
          >
            <option value="" disabled>
            SELECT PRODUCT
            </option>

            {productsNotAvailable.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          {selectedProductNames3 && (
            <div className="card-body">
              <img
                src={getProductById(input3.id)?.image}
                alt="Product"
                className="card-img-top"
                style={imgStyle}
              />
              <p className="card-text">
                You would like to get this clothe out from your avaiable stock?
              </p>
            </div>
          )}
        </form>

        <button
          className="btn btn-warning d-print-block p-2"
          onClick={confirmDespause}
          // disabled={isNotEmpty(errors)}
        >
          Publish Product
        </button>

        {false && (
          <div className="container">
            <div className="row">
              <div className="col align-self-center">
                <div className="card-body">
                  <button className="btn btn-danger" onClick={toggle}>
                    No
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={confirmDespause}
                    type="submit"
                  >
                    Sí
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================================================================================ */}

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
