import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderById, getAllProducts } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import axios from "axios";

const ListUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userOrders, setUserOrders] = useState([]);
  const orders = useSelector((state) => state.orders);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  useEffect(async () => {
    try {
      const response = await axios.get(`orders/${id}`);
      setUserOrders([...response.data]);
    } catch (error) {
      alert(error);
    }
  }, []);

  const getOrderDetails = (orderId) => {
    const order = userOrders.find((order) => order.id === orderId);
    if (order) {
      return (
        <div key={order.id} style={{ border: "1px solid black", padding: "10px", margin: "10px", textAlign: "center" }}>
          <h1 style={{ margin: "auto" }}>{order.status}</h1>
          <h3 style={{ margin: "auto" }}>{order.paymentMethod}</h3>
          <h3 style={{ margin: "auto" }}>{order.total}</h3>
          <h3 style={{ margin: "auto" }}>{order.date}</h3>
          <h1 style={{ textAlign: "center" }}>Clothes:</h1>
          <ul style={{ textAlign: "center" }}>
            {order.products.map((product) => {
              const foundProduct = products.find((p) => p.id === product.id);
              return (
                <li key={product.id} style={{ textAlign: "center" }}>
                  <img src={foundProduct ? foundProduct.image : ""} alt={foundProduct ? foundProduct.title : ""} />
                  <strong style={{ textAlign: "center" }}>{product.title}</strong>
                  <p style={{ textAlign: "center" }}>Quantity: {product.quantity}</p>
                  <p style={{ textAlign: "center" }}>Price: {product.unit_price}</p>
                  <p style={{ textAlign: "center" }}>Currency ID: {product.currency_id}</p>
                </li>
              );
            })}
          </ul>
          <p style={{ margin: "auto" }}>User ID: {order.userId}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Order List for User {id}</h2>
      {userOrders.length > 0 ? (
        userOrders.map((order) => getOrderDetails(order.id))
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
};

export default ListUser;







