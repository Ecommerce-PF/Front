import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getDetail, addCart } from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md"
import styles from "./detail.module.css";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetail);

  const [coloresPrt, setColoresPrt] = useState([]);
  const [numberImg, setNumberImg] = useState(0);
  const [colorProductImg, setColorProductImg] = useState('');

  const handleAddCart = () => {
    dispatch(addCart(state));

    const listaCart = JSON.parse(localStorage.getItem("carritoLS")) || [];

    for (let i = 0; i < listaCart.length; i++) {
      if (listaCart[i].id === state.id) {
        return Swal.fire({
          icon: 'error',
          title: '¡El producto ya se encuentra en el carrito!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

    listaCart.push({
      ...state,
      quantity: 1
    });

    localStorage.setItem("carritoLS", JSON.stringify(listaCart));

    Swal.fire({
      icon: "success",
      title: "¡Su producto se ha agregado al carrito!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleChange = (e) => {
    if (e.target.value === 'None') {
      setColoresPrt([]);
    } else {
      setColorProductImg(e.target.value);
      setColoresPrt(clrPrdct(e.target.value));
    }
  };

  const clrPrdct = (valorBuscado) => {
    for (let i = 0; i < state.color.length; i++) {
      if (state.color[i].ColorName === valorBuscado) {
        return state.color[i].ProductImages;
      }
    }
    return null;
  };

  const changeLeft = () => {
    if (numberImg > 0) {
      setNumberImg(numberImg - 1);
    } else {
      setNumberImg(coloresPrt.length - 1);
    }
  };

  const changeRigth = () => {
    if (numberImg < coloresPrt.length - 1) {
      setNumberImg(numberImg + 1);
    } else {
      setNumberImg(0);
    }
  };

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.back}>
      <div className={styles.mainContainer}>
        <div className={styles.productImg}>
          <h3>{state?.name}</h3>
          <div className={styles.img}>
            {!!coloresPrt.length ? (
              <div>
                <button onClick={changeLeft}><MdOutlineArrowBackIos /></button>
                <img
                  src={coloresPrt[numberImg]}
                  alt={state?.name}
                  className={styles.imgProducto}
                />
                <button onClick={changeRigth}><MdOutlineArrowForwardIos /></button>
              </div>
            ) : (
              <img
                src={state?.image}
                alt={state?.name}
                className={styles.imgProducto}
              />
            )}
          </div>
          <div className={styles.buyNow}>
            <h1>${state?.price}</h1>
          </div>

          <div className={styles.containerSA}>
            <label htmlFor="color">Color:</label>
            <select className={styles.buttonSelect} type="select" name="color" onChange={handleChange}>
              <option className={styles.option}>None</option>
              {state?.color && state.color.map((e) => (
                <option className={styles.option} name={e.ColorName} key={e.ColorName}>
                  {e.ColorName}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="color">Size:</label>
              <button className={styles.size}>S</button>
              <button className={styles.size}>M</button>
              <button className={styles.size}>L</button>
            </div>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.description}>
            <div
              className={styles.textss}
              dangerouslySetInnerHTML={{ __html: state?.description }}
            ></div>
          </div>
          <div className={styles.cart}>
            <button className={styles.button} onClick={handleAddCart}>
              Add to Cart <FaCartArrowDown className={styles.icon}></FaCartArrowDown>
            </button>
            <NavLink to="/home">
              <button className={styles.button}>
                Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
