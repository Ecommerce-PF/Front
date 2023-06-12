import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersUsers } from "../../redux/actions/actions.js";
import { useSelector, useDispatch } from "react-redux";

const OrdersUsers = () => {
  const orders = useSelector(state => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersUsers());
  }, [dispatch]);

  return (
    <div>
      {orders.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          Los usuarios no realizaron órdenes.
        </div>
      ) : null}
      {orders && orders.map(o => (
        <div className="card text-white bg-dark mb-3 mt-3" key={o.id}>
          <div className="card-header">
            User Id: {o.userId}
          </div>
          <div className="card-body">
            <h5 className="card-title">Order Id: {o.id}</h5>
            <p className="card-text">Total Gastado: {o.totalPrice}</p>
            <Link to={`/admin/orders/${o.id}`}>
              <button className="btn btn-outline-warning d-print-block btn-sm p-2">Ir a la Orden</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersUsers;