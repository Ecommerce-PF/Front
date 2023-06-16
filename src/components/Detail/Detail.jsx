import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getDetail,
  addCart,
  getUserById,
} from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md"
import styles from "./detail.module.css";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetail);
  const idUser = useSelector((state) => state.idUsuario);
  const user = useSelector((state) => state.userId);

  if (user.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("users", user.name);
  }
  const userOnline = localStorage.getItem("users");

  console.log(userOnline, "userOnline");

  const [comments, setComments] = useState([]);

  if (idUser.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("idUsers", idUser);
  }
  const idUsers = localStorage.getItem("ids");

  const fecha = {
    fecha: new Date(),
  };

  const [form, setForm] = useState({
    review: "",
    rating: 5,
    date: fecha.fecha + "",
    UserId: idUsers,
    ClotheId: id,
  });

  const hanleChange = (event) => {
    const value = event.target.value; // Corregir 'targer' a 'target'
    const name = event.target.name; // Corregir 'targer' a 'target'

    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/products/${id}/reviews`);
        console.log(response.data, "response");
        setComments(response.data); // Asignar los comentarios a la variable 'comments'
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/products/${id}/reviews`, JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Formulario enviado correctamente");
    } catch (err) {
      alert(err);
    }
  };

  console.log(form);

  const [coloresPrt, setColoresPrt] = useState([]);
  const [numberImg, setNumberImg] = useState(0);
  const [colorProductImg, setColorProductImg] = useState('');
  const [sizesArr, setSizeArr] = useState([]);

  const handleAddCart = () => {
    dispatch(addCart(state));
    let listaCart = JSON.parse(localStorage.getItem("carritoLS"));
    if (listaCart === null) {
      listaCart = [];
    } else {
      for (var i = 0; i < listaCart.length; i++) {
        if (listaCart[i].id === state.id) {
          return (Swal.fire({
            icon: 'error',
            title: 'To producto ya se encuentra en Carrito!',
            showConfirmButton: false,
            timer: 1500
          }))
        }
      }

      listaCart.push({
        ...state,
        quantity: 1,
      });

      localStorage.setItem("carritoLS", JSON.stringify(listaCart));

      Swal.fire({
        icon: "success",
        title: "¡Su producto se ha agregado al carrito!",
        showConfirmButton: false,
        timer: 1500,
      });
    };

    useEffect(() => {
      dispatch(getDetail(id));
      dispatch(getUserById(idUsers));
    }, [dispatch, id]);

    //Logica de galeria img
    const [colorProductImg, setColorProductImg] = useState('');
    const [coloresPrt, setColoresPrt] = useState([]);

    function handleChange(e) {
      console.log(e.target.value)
      const handleChange = (e) => {
        if (e.target.value === 'None') {
          setColoresPrt([]);
        } else {
          setColorProductImg(e.target.value);
          setColoresPrt(clrPrdct(e.target.value));
          setSizeArr(findArrSize(e.target.value));
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

      const findArrSize = (valorBuscado) => {
        for (let i = 0; i < state.color.length; i++) {
          if (state.color[i].ColorName === valorBuscado) {
            return state.color[i].Sizes;
          }
        }
        return null;
      }

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

      console.log(sizesArr);

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
                  <div className={styles.divGaleryImg}>
                    <button onClick={changeLeft} className={styles.bttnArrow} ><MdOutlineArrowBackIos /></button>
                    <img
                      src={coloresPrt[numberImg]}
                      alt={state?.name}
                      className={styles.imgProducto}
                    />
                    <button onClick={changeRigth} className={styles.bttnArrow} ><MdOutlineArrowForwardIos /></button>
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
                <select className={styles.buttonSelect} type="select" name="color">
                  <option className={styles.option}>None</option>
                  {state?.color &&
                    state.color.map((e) => (
                      <option
                        className={styles.option}
                        name={e.ColorName}
                        key={e.ColorName}
                      >
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
                <div className={styles.textss}
                  dangerouslySetInnerHTML={{ __html: state?.description }}
                ></div>
              </div>
              <div className={styles.cart}>
                <button className={styles.button} onClick={handleAddCart}>
                  Add to Cart{" "}
                  <FaCartArrowDown className={styles.icon}></FaCartArrowDown>
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
