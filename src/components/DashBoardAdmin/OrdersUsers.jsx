import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAll, deleteUser } from '../../redux/actions/actions.js';
import style from "../DashBoardAdmin/OrdersUsers.module.css"

const OrdersUsers = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAll());
  }, [dispatch]);

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
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </button>
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