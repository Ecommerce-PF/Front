import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../redux/actions/actions.js";

export default function Delete() {
  const [borrar, setBorrar] = useState(false);
  const [errors, setErrors] = useState({ noInputs: "No hay inputs" });
  const [input, setInputs] = useState({ id: "" });
  const [selectedProductName, setSelectedProductName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = function (e) {
    const productId = e.target.value;
    const productName = getProductById(productId)?.name;
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
    e.preventDefault();
    dispatch(deleteProduct(input.id));
    setInputs({ id: "" });
    setBorrar(false);
    setShowAlert(true);
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

  return (
    <div className="container text-center d-flex justify-content-center align-items-center">
      <form className="m-5">
        <select
          name="id"
          className="btn btn-light dropdown-toggle m-3"
          value={input.id}
          onChange={handleInputChange}
        >
          <option value="" disabled>SELECCIONAR PRENDA</option>
          {products.map((product) => {
            return <option key={product.id} value={product.id}>{product.name}</option>;
          })}
        </select>
        {errors.id && <p style={danger}>{errors.id}</p>}
      </form>
      <button
        className="btn btn-warning d-print-block p-2"
        onClick={toggle}
        disabled={isNotEmpty(errors)}
      >
        Borrar producto
      </button>
      {borrar && (
        <div className="container">
          <div className="row">
            <div className="col align-self-center">
              <div className="card-body">
                <p className="card-text">¿Está seguro de borrar el producto: {selectedProductName}?</p>
                <button className="btn btn-danger" onClick={toggle}>
                  No
                </button>
                <input
                  className="btn btn-success"
                  onClick={(e) => deletee(e, input)}
                  type="submit"
                  value="Si"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className="alert alert-success mt-3" role="alert">
          ¡La prenda {selectedProductName} ha sido borrada exitosamente!
        </div>
      )}
    </div>
  );
}

export function validate(input) {
  let errors = {};
  if (!input.id) errors.id = "Seleccione una prenda para borrar";
  return errors;
}