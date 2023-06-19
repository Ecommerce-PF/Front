import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./ListUser.module.css";
import axios from "axios";

const ListUser = () => {

  const { id } = useParams();
  const [userOrders, setUserOrders] = useState([]);

const submitHandler = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.get(`orders/${id}`);
    setUserOrders([...response.data]);
  } catch (error) {
    alert(error);
  }
}

return (
  <>
    <form action="" onSubmit={submitHandler} className={styles.formulario}>
        
        <h1>Your Histrial of Purchases</h1>
      
      <button type="submit" className={styles.bottonAsk}>Ask Data🔍</button>
    </form>
    <div className={styles.div_containers}>
      
      <h1>Orders</h1>
   <div className={styles.each_liElement}>

  
    <ul className={styles.ul_elements}>
      {userOrders.map((order, index) => (
        <li key={index} className={styles.li_elements}> 
          <p>Order ID: {order.id} 📍</p>
          <p>Order Date: {order.date}</p>
          <p>Status : {order.status}</p>
          <p>Total de la compra: 💲{order.total}</p>
          <p>Payment Method: {order.paymentMethod} 💰</p>
          <p>Products: </p>
          <ul>
            {order.products.map((product, index) => (
              <li key={index} className={styles.li_elements_inside}>
                <p>Product ID: {product.id}</p>
                <p>Product Title: {product.title}</p>
                <p>Product Price: {product.unit_price}</p>
                <p>Product Quantity: {product.quantity}</p>
                <p>Product Currency: {product.currency_id}💲</p>
              </li>
            ))}
          </ul>

        </li>
      ))}
    </ul>
    </div>
      </div>


    <div>
        <Link to="/profile">
          <button className={styles.button}>
            Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
          </button>
        </Link>
      </div>
  </>
);

}

export default ListUser;
