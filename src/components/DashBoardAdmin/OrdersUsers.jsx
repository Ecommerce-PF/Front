import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserAll,
  deleteUser,
  getUserById,
} from "../../redux/actions/actions.js";

import style from "../DashBoardAdmin/OrdersUsers.module.css";
import { FaArrowLeft } from "react-icons/fa";

import axios from "axios";


const OrdersUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const id = useSelector((state) => state.idUsuario);
  const [banButtonMap, setBanButtonMap] = useState({}); // Mapa para almacenar el estado de los botones de banear

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);

  useEffect(() => {
    if (id.length > 0) {
      localStorage.setItem("ids", id);
    }
  }, [id]);

  const idUser = localStorage.getItem("ids");

  const handleBanUser = (id) => {
    dispatch(getUserById(id));

    // Actualizar el estado del botón correspondiente
    setBanButtonMap((prevButtonMap) => ({
      ...prevButtonMap,
      [id]: !prevButtonMap[id], // Invertir el estado del botón al que se le hizo clic
    }));

    const updatedIdBan = {
      active: banButtonMap[id], // Utilizar el estado actual del botón para determinar el valor de "active"
    };

    try {
      axios.put(`/users/${id}`, updatedIdBan).then((res) => {
        if (updatedIdBan.active) {
          alert("Usuario desbaneado correctamente");
        } else {
          alert("Usuario baneado correctamente");
        }
      });
    } catch (error) {
      alert("No se pudo editar el usuario");
    }
  };

  const handleDeleteUser = (id) => {
    // Mostrar ventana emergente de confirmación antes de eliminar al usuario
    if (window.confirm("¿Estás seguro de que quieres eliminar a este usuario definitivamente?")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    // Crear el estado inicial de los botones de banear al cargar los usuarios
    const initialButtonMap = {};
    users.forEach((user) => {
      initialButtonMap[user.id] = user.isActive;
    });
    setBanButtonMap(initialButtonMap);
  }, [users]);

  return (
    <>
   
    <div className={style.container}>
      <h1>Usuarios registrados</h1>
      {users && users.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No hay usuarios registrados.
        </div>
      ) : (
        <table className={style.table}>
          <thead className={style.arriba}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className={`btn ${
                      banButtonMap[user.id] ? "btn-success" : "btn-warning"
                    }`}
                    onClick={() => handleBanUser(user.id)}
                  >
                    {banButtonMap[user.id] ? "Desbanear" : "Banear"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>


<Link to="/DashBoardAdmin">
<button className={style.button}>
  Back <FaArrowLeft className={style.icon}></FaArrowLeft>
</button>
</Link>

</>
  );
};

export default OrdersUsers;