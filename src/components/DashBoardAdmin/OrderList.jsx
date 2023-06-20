import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserAll, getUserById, getOrderById, getAllOrders, getAllProducts } from "../../redux/actions/actions.js";
import styles from "./OrderList.module.css";
import { FaArrowLeft } from "react-icons/fa";


const OrderList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);
  const products = useSelector((state) => state.products);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [form, setForm] = useState({ id: null });

  useEffect(() => {
    dispatch(getUserAll());
    dispatch(getAllOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleUserChange = (userId) => {
    setSelectedUser(userId);
    setSelectedOrder(null);

    if (userId) {
      dispatch(getUserById(userId));
      setForm({ ...form, id: userId });
      const userOrders = orders.filter((order) => order.userId === userId);
      setUserOrders(userOrders);
    } else {
      setForm({ ...form, id: null });
      setUserOrders([]);
    }
  };

  const handleOrderChange = async (orderId) => {
    setSelectedOrder(orderId);

    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  };

  const getUserData = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? (
      <div>
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
      </div>
    ) : null;
  };

  const getUserOrders = (userId) => {
    return userOrders.length > 0 ? (
      <div>
        <h3>Orders</h3>
        <select onChange={(e) => handleOrderChange(e.target.value)}>
          <option value="">Select an order</option>
          {userOrders.map((order) => (
            <option key={order.id} value={order.id}>
              Order ID: {order.id}
            </option>
          ))}
        </select>
      </div>
    ) : null;
  };

  const getOrderDetails = () => {
    const order = orders.find((order) => order.id === selectedOrder);
    if (order) {
      return (
        <div>
          <h3>Selected Order</h3>
          <div style={{ border: "1px solid black", padding: "10px", margin: "10px", textAlign: "center" }}>
            <h1>{order.status}</h1>
            <h3>{order.paymentMethod}</h3>
            <h3>{order.total}</h3>
            <h3>{order.date}</h3>
            <h1>Clothes:</h1>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {order.products.map((product) => {
                const foundProduct = products.find((p) => p.id === product.id);
                return (
                  <li key={product.id} style={{ marginBottom: "10px" }}>
                    <img src={foundProduct ? foundProduct.image : ""} alt={foundProduct ? foundProduct.title : ""} />
                    <h4>{product.title}</h4>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.price}</p>
                    <p>Currency ID: {product.currencyId}</p>
                  </li>
                );
              })}
            </ul>
            <p>User ID: {order.userId}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleViewAllOrders = () => {
    setSelectedUser(null);
    setSelectedOrder(null);
    setUserOrders([]);
  };

  return (
    <>
    <div style={{ textAlign: "center" }}>
      <h2>Order List</h2>
      <select onChange={(e) => handleUserChange(e.target.value)}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            User ID: {user.id}
          </option>
        ))}
      </select>
      {selectedUser && (
        <div>
          {getUserData(selectedUser)}
          {getUserOrders(selectedUser)}
        </div>
      )}
      {selectedOrder && getOrderDetails()}
      {!selectedUser && (
        <div>
          <h3>All Orders</h3>
          {orders.map((order) => (
            <div key={order.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
              <h1>{order.status}</h1>
              <h3>{order.paymentMethod}</h3>
              <h3>{order.total}</h3>
              <h3>{order.date}</h3>
              <h1>Clothes:</h1>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {order.products.map((product) => {
                  //const foundProduct = products.find((p) => p.id === product.id);
                  return (
                    <li key={product.id} style={{ marginBottom: "10px" }}>
                      <h4>{product.title}</h4>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.price}</p>
                      <p>Currency ID: {product.currencyId}</p>
                    </li>
                  );
                })}
              </ul>
              <p>User ID: {order.userId}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleViewAllOrders}>View All Orders</button>
    </div>

              <Link to="/DashBoardAdmin">
                <button className={styles.button_back}>
                Back <FaArrowLeft className={styles.icon_back}></FaArrowLeft>
                </button>
              </Link>

      </>
  );
};

export default OrderList;