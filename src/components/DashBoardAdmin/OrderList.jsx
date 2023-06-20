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

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [userOrders, setUserOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    dispatch(getUserAll());
    dispatch(getAllOrders());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getUserById(selectedUserId));
      const userOrders = orders.filter((order) => order.userId === selectedUserId);
      setUserOrders(userOrders);
      setFilteredOrders(userOrders);
    } else {
      setUserOrders([]);
      setFilteredOrders(orders);
    }
  }, [dispatch, orders, selectedUserId]);

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
    setSelectedOrderId("");
  };

  const handleOrderChange = (event) => {
    setSelectedOrderId(event.target.value);
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
        <select onChange={handleOrderChange}>
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
    const order = orders.find((order) => order.id === selectedOrderId);
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

  const handleFilterByDate = () => {
    setIsAscending((prevState) => !prevState);
  
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (isAscending) {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  
    setFilteredOrders(sortedOrders);
  };

  const handleViewAllOrders = () => {
    setSelectedUserId("");
    setSelectedOrderId("");
    setUserOrders(orders);
    setFilteredOrders(orders);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>Order List</h2>
        <form className="m-5">
          <select
            name="userId"
            className="btn btn-light dropdown-toggle m-3"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              SELECT USER
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </form>
        {selectedUserId && (
          <div>
            {getUserData(selectedUserId)}
            {getUserOrders(selectedUserId)}
          </div>
        )}
        {selectedOrderId && getOrderDetails()}
        {!selectedUserId && (
          <div>
            <h3>All Orders</h3>
            <button onClick={handleFilterByDate}>Filter by Date</button>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
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
              ))
            ) : (
              <p>No orders found.</p>
            )}
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