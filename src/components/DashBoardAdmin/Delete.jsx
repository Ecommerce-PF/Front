import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../redux/actions/actions.js";

export default function Delete() {
  const [borrar, setBorrar] = useState(false);
  const [errors, setErrors] = useState({ noInputs: "No hay inputs" });
  const [input, setInputs] = useState({ id: "" }); // Cambiado a 'id' en lugar de 'name'
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = function (e) {
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    setInputs({ ...input, [e.target.name]: e.target.value });
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
    dispatch(deleteProduct(input.id)); // Cambiado a 'id' en lugar de 'name'
    setInputs({ id: "" }); // Cambiado a 'id' en lugar de 'name'
    setBorrar(false);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
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
          name="id" // Cambiado a 'id' en lugar de 'name'
          className="btn btn-light dropdown-toggle m-3"
          value={input.id} // Cambiado a 'id' en lugar de 'name'
          onChange={handleInputChange}
        >
          <option value="" disabled>SELECCIONAR PRENDA</option>
          {products.map((product) => {
            return <option key={product.id}>{product.id}</option>; // Utilizando 'id' en lugar de 'name'
          })}
        </select>
        {errors.name && <p style={danger}>{errors.name}</p>}
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
                <p className="card-text">¿Está seguro de borrar el producto?</p>
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
          ¡La prenda ha sido borrada exitosamente!
        </div>
      )}
    </div>
  );
}

export function validate(input) {
  let errors = {};
  if (!input.id) errors.name = "Seleccione una prenda para borrar"; // Cambiado a 'id' en lugar de 'name'
  return errors;
}