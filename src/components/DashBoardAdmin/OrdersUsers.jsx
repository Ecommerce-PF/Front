import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAll, deleteUser, banUser } from '../../redux/actions/actions.js';
import style from "../DashBoardAdmin/OrdersUsers.module.css";

const OrdersUsers = () => {
  const users = useSelector(state => state.users);
  const banUserError = useSelector(state => state.banUserError);
  const dispatch = useDispatch();
  const [banUserMessage, setBanUserMessage] = useState(null);
  const [userBan, setUserBan] = useState({
    isActive: false,
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
    dispatch(banUser(id, true));
    setUserBan({ isActive: true });
  };

  const handleUserBanChange = () => {
    setUserBan(prevState => ({
      isActive: !prevState.isActive,
    }));
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
              <th>Rol</th>
              <th>Baneado</th>
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
                  <input
                    type="checkbox"
                    checked={userBan.isActive}
                    onChange={handleUserBanChange}
                    disabled={!user.isAdmin}
                  />
                </td>
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