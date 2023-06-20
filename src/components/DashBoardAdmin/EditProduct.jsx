import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../redux/actions/actions.js";
import { FaArrowLeft } from "react-icons/fa";

import UploadFile from "../UploadFile/UploadFile.jsx";

import styles from "./EditProduct.module.css";
import Swal from "sweetalert2";

import axios from "axios";

const EditProduct = () => {
  const navigate = useNavigate();

  /*************************ESTO ES PARA MONTAR LA CARTA*********************************************** */
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  const state = useSelector((state) => state.productDetail);
  const { name, color, price, image, category, parentCategory, description } =
    state;
  /*****************************ESTO ES DEL FORMULARIO************************************************ */
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(state?.image);
  }, [setUrl,state.image]);
  const [form, setForm] = useState({
    id: id,
    name,
    color,
    price,
    image,
    category,
    parentCategory,
    description,
    // stock,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      const colorsArray = value.split(",").map((color) => ({
        name: color.trim(),
        // otros atributos que necesites para el color
      }));

      setForm((prevForm) => ({
        ...prevForm,
        [name]: colorsArray,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/${id}`, form).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(`/detail/${id}`);
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const handleUpload = async (error, result) => {
    if (result && result.event === "success") {
      setUrl(result.info.secure_url);
      setForm({ ...form, image: result.info.secure_url });
    }
  };

  return (
    <>
      {/* /**************************************************************************************** */}

      <div className={styles.main_container}>
        <div className={styles.info_container}>
          <h1>PRODUCT DATA</h1>
          <h3>{state?.name}</h3>
          <img src={url} alt={state?.name} className={styles.image} />

          <h3>${state?.price}</h3>

          <label htmlFor="color">Color:</label>
          <select type="select" name="color">
            <option>None</option>
            {state?.color &&
              state.color.map((e) => (
                <option name={e.ColorName} key={e.ColorName}>
                  {e.ColorName}
                </option>
              ))}
          </select>

          <label htmlFor="">Descrition:</label>
          {/* <p>{state?.description}</p> */}
          <div dangerouslySetInnerHTML={{ __html: state?.description }}></div>

          <Link to="/home">
            <button className={styles.button}>
              Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
            </button>
          </Link>
        </div>

        {/* /**************************************************************************************** */}

        <div className={styles.form_container}>
          <form action="" onSubmit={handleSubmit}>
            <h1>EDIT PRODUCT</h1>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={form.name}
            />

            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              id="imagen"
              onChange={handleChange}
              value={form.image}
              placeholder="Could copy from URL"
            />
            <UploadFile handleUpload={handleUpload} folder={"product"} />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              value={form.price}
            />

            {/* <label htmlFor="color">Colors</label>
            <input 
            type="text"
            name="color"
            id="color"
            onChange={handleChange}
            value={form.color} /> */}

            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              value={form.category}
            />

            <label htmlFor="parentCategory">parentCategory</label>
            <input
              type="text"
              name="parentCategory"
              id="description"
              onChange={handleChange}
              value={form.parentCategory}
            />

            <label htmlFor="description">Description</label>
            <input
              type="textarea"
              name="description"
              id="description"
              onChange={handleChange}
              value={form.description}
            />

            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              id="stock"
              onChange={handleChange}
              value={form.stock}
            />

            <button type="submit" className={styles.button}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
