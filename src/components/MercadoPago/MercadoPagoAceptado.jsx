import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MercadoPagoAceptado.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";

export default function MercadoPagoAceptado() {

  const [successTicket, setSuccessTicket] = useState([]);
  const [defaultSuccess, setDefaultSuccess] = useState(true)
  const userId = localStorage.getItem("ids") ? localStorage.getItem("ids") : null;
  const getTicket = async () => {
    setSuccessTicket(await axios.get(`https://server-ecommerce.up.railway.app/users/${userId}`))
    console.log("Se ejecuto")
  }

  useEffect(() => {
    if (defaultSuccess) {
      getTicket();
      setDefaultSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSuccess])

  let arrSuccess = [];
  let totalCompra = 0;
  if(successTicket.data?.Orders[0]?.products){
    arrSuccess = successTicket.data?.Orders[0].products;
  }
  if(successTicket.data?.Orders[0]?.total){
    totalCompra = successTicket.data?.Orders[0].total
  }

  console.log(successTicket.data?.Orders[0]?.products)

  // const arrSuccess = (!!successTicket.data?.Orders[0].products) ? (successTicket.data?.Orders[0].products && successTicket.data?.Orders[0].products) : [];
  // const totalCompra = (!!successTicket.data?.Orders[0].total) ? (successTicket.data?.Orders[0].total && successTicket.data?.Orders[0].total) : 0;
  return (
    <div className={styles.successPage}>
      <h2>Su pago fue aceptado <AiOutlineCheckCircle className={styles.iconCheck} /></h2> 
      <div>
        {
          successTicket.data?.Orders[0]?.products ?
            <div className={styles.ticketSuccess}>
              {arrSuccess?.map((e) => {
                return (<p key={e.title}>{e.title}</p>)
              })}
              <hr />
              {<p>Total: {totalCompra}</p>}
            </div> :
            <p>no hay nada</p>
        }
      </div>
      <Link to="/home">
        <button className={styles.button}>
          <FaArrowLeft className={styles.icon}></FaArrowLeft> Return To Home
        </button>
      </Link>
    </div>
  );
}
