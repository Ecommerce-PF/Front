import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAll, deleteUser } from "../../redux/actions/actions.js";
import style from "../DashBoardAdmin/OrdersUsers.module.css";
import axios from "axios";

const OrdersUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const id = useSelector((state) => state.idUsuario);
  const idBan = useSelector((state) => state.userId);

  console.log(idBan, "el primero");

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }
  const idUser = localStorage.getItem("ids");

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);

  const [form, setForm] = useState({
    active: false,
    admin: true,
    email: "dasda",
    id: 99,
    name: "dasdasd",
    password: "dasdasd",
    phone: "dasdasdas",
    profileImage: "dasdasd",
    userName: "dasdasd",
    Orders: [],
    Clothes: [],
    profileImage: "",
  });

  const handleBanUser = (id) => {
    try {
      axios.put(`/users/${id}`, form).then((res) => {
        alert("Producto editado con exito");
      });
    } catch (error) {
      alert("No se pudo editar el producto");
    }
  };

  const handleDeleteUser = (id) => {

    dispatch(deleteUser(id));
  };

  return (
    <div className={style.container}>
      <h1>Usuarios registrados</h1>
      {/* {banUserMessage && <div className="alert alert-danger">{banUserMessage}</div>} */}
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
                  {user.isActive ? ( // Mostrar el estado de baneo y permitir desbanear
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
