import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserAll,
  deleteUser,
  getUserById,
} from "../../redux/actions/actions.js";
import style from "../DashBoardAdmin/OrdersUsers.module.css";
import axios from "axios";

const OrdersUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const id = useSelector((state) => state.idUsuario);
  const [idBan, setIdBan] = useState({ active: false }); // Estado idBan y su función de actualización

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);

  useEffect(() => {
    if (id.length > 0) {
      localStorage.setItem("ids", id);
    }
  }, [id]);

  const idUser = localStorage.getItem("ids");

  console.log(idUser, "esto es el id user");

  const handleBanUser = (id) => {
    dispatch(getUserById(id));
    const updatedIdBan = { ...idBan };
    updatedIdBan.active = !updatedIdBan.active;
    console.log(updatedIdBan, "updatedIdBan");

    try {
      axios.put(`/users/${id}`, updatedIdBan).then((res) => {
        if (updatedIdBan.active === true) {
          alert("Usuario desbaneado correctamente");
        } else {
          alert("Usuario baneado correctamente");
        }
      });
    } catch (error) {
      alert("No se pudo editar el usuario");
    }

    // Actualizar el estado idBan con el nuevo valor
    setIdBan(updatedIdBan);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
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
                  {user.isActive ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleBanUser(user.id)}
                    >
                      Desbanear
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => handleBanUser(user.id)}
                    >
                      Banear
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersUsers;
