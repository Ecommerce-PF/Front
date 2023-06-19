import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../DashBoardAdmin/OrdersUsers.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { getUserAll, deleteUser } from "../../redux/actions/actions.js";

const OrdersUsers = () => {
  const dispatch = useDispatch();
  const { users, id } = useSelector((state) => {
    return {
      users: state.users,
      id: state.idUsuario,
    };
  });
  const [banButtonMap, setBanButtonMap] = useState({}); // Mapa para almacenar el estado de los botones de banear

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);

  useEffect(() => {
    // Crear el estado inicial de los botones de banear al cargar los usuarios
    const initialButtonMap = {};
    users.forEach((user) => {
      initialButtonMap[user.id] = user.active;
    });
    setBanButtonMap(initialButtonMap);
  }, [users]);

  if (id) localStorage.setItem("ids", id);

  const handleBanUser = async (id) => {
    // Actualizar el estado del botón correspondiente
    await setBanButtonMap({
      ...banButtonMap,
      [id]: !banButtonMap[id], // Invertir el estado del botón al que se le hizo clic
    });
    try {
      axios.put(`/users/${id}`, { active: !banButtonMap[id] }).then((res) => {
        if (!banButtonMap[id]) {
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
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar a este usuario definitivamente?"
      )
    ) {
      dispatch(deleteUser(id));
    }
  };
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
                      {banButtonMap[user.id] ? "Ban" : "Unban"}
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
