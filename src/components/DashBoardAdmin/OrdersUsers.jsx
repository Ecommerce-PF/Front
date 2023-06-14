import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAll, deleteUser, banUser } from '../../redux/actions/actions.js';
import style from "../DashBoardAdmin/OrdersUsers.module.css";

const OrdersUsers = () => {
  const users = useSelector(state => state.users);
  const banUserError = useSelector(state => state.banUserError);
  const dispatch = useDispatch();
  const [banUserMessage, setBanUserMessage] = useState(null);
  const id = useSelector((state) => state.idUsuario);

  if (id.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("ids", id);
  }
  const idUser = localStorage.getItem("ids");


const [form, setForm] = useState({
    id: idUser,
    name: "",
    userName: "",
    phone: "",
    email: "",
    profileImage: "",
    });


    
  useEffect(() => {
    dispatch(getUserAll());
    if (banUserError) {
      setBanUserMessage(`Error al banear usuario: ${banUserError}`);
    } else {
      setBanUserMessage(null);
    }
  }, [dispatch, banUserError]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleBanUser = (id) => {
    dispatch(banUser(id));
  };

  return (
    <div className={style.container}>
      <h1>Usuarios registrados</h1>
      {banUserMessage && <div className="alert alert-danger">{banUserMessage}</div>}
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
            {users.map(user => (
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
