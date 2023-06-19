
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../redux/actions/actions.js";
import axios from "axios";
import styles from "./CreatePost.module.css";
import { FaArrowLeft } from "react-icons/fa";
import UploadFile from "../UploadFile/UploadFile";
import Swal from "sweetalert2";

export default function CreatePost() {
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const idUsed = products.map((product) => product.id);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const [allCategories, setAllCategories] = useState("All categories");

  const [error, setError] = useState({
    name: "",
    color: "",
    price: "",
    image: "",
    category: [],
    description: "",
  });

  const [input, setInput] = useState({
    id: 0,
    name: "",
    color: [],
    price: 0,
    image:
      "https://marketplace.canva.com/EAFBKs7K_lE/1/0/1600w/canva-colorful-variety-of-clothes-hanging-on-rack-new-arrival-instagram-post-wBkgRMEh93E.jpg",
    category: "",
    parentCategory: "",
    description: "",
  });

  useEffect(() => {
    function generarNumeroAleatorio() {
      let numerosDisponibles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let numeroGenerado = "";

      for (let i = 0; i < 4; i++) {
        const indiceAleatorio = Math.floor(
          Math.random() * numerosDisponibles.length
        );
        const digito = numerosDisponibles.splice(indiceAleatorio, 1)[0];
        numeroGenerado += digito.toString();
      }

      return numeroGenerado;
    }

    setInput((prevInput) => ({
      ...prevInput,
      id: generarNumeroAleatorio(),
    }));
  }, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    if (name === "color") {
      const colorsArray = value.split(",").map((color) => ({
        name: color.trim(),
        // otros atributos que necesites para el color
      }));

      setInput((prevInput) => ({
        ...prevInput,
        [name]: colorsArray,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  }, []);

  const changeHandler = useCallback((event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setAllCategories(value);
    }
    setInput((prevInput) => ({
      ...prevInput,
      [name]: name === "id" ? parseInt(value) : value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  }, []);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post("/products", input)
        .then(() =>
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your clothe has been saved successfully",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .then(() => navigate(`/detail/${input.id}`))
        .catch((error) => alert(error));
    },
    [input]
  );

  const handleUpload = useCallback(async (error, result) => {
    if (result && result.event === "success") {
      setInput((prevInput) => ({
        ...prevInput,
        image: result.info.secure_url,
      }));
    }
  }, []);



  
const validate = (input) => {
  let error = {};
  if (!input.name) {
    error.name = "Name is required";
  }
  if (!input.color) {
    error.color = "Color is required";
  }
  if (!input.price) {
    error.price = "Price is required";
  }
  if (!input.category) {
    error.category = "Category is required";
  }
  if (!input.description) {
    error.description = "Description is required";
  }
  return error;
};


  return (
    <div className={styles.body_container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.statsAndTypes}>
          <div className={styles.stats}>
            <h1>Create New Clothe </h1>

            {/* /********************************************************************************* */}
            <div className={styles.inputBlock}>
              <label className={styles.label_name}>Name Clothe:</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                id="input-text"
                required
                spellCheck="false"
                value={input.name}
                onChange={changeHandler}
              />
              {error.name && <p>{error.name}</p>}
            </div>

            {/* /********************************************************************************* */}

            <div className={styles.felx_container}>
              <div>
                <UploadFile
                  handleUpload={handleUpload}
                  folder={"product"}
                ></UploadFile>
              </div>

              <img
                src={input.image}
                className={styles.imgPreview}
                alt={input.name}
                width="250"
                height="250"
              />
              <div>
                <label className={styles.label_name}>Price</label>
                <input
                  className={styles.input}
                  type="number"
                  name="price"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.price}
                  onChange={changeHandler}
                />
                {error.price && <p>{error.price}</p>}
              </div>
            </div>

            {/* /********************************************************************************* */}
            <div className={styles.inputBlock}>
              <label htmlFor="color" className={styles.label_name}>
                Color:
              </label>
              <input
                className={styles.input}
                type="text"
                name="color"
                id="color"
                onChange={handleChange}
                value={input.color.map((color) => color.name).join(", ")}
              />
            </div>

            {/* /********************************************************************************* */}

            <div className={styles.inputBlock}>
              <label className={styles.label_name}>Description :</label>
              <input
                className={styles.input}
                type="text"
                name="description"
                id="input-text"
                required
                spellCheck="false"
                value={input.description}
                onChange={changeHandler}
              />
            </div>

            {/* /********************************************************************************* */}

            <div className={styles.inputBlock}>
              <label htmlFor="" className={styles.label_name}>
                Category:{" "}
              </label>
              <select
                className={styles.select}
                value={input.category}
                name="category"
                onChange={changeHandler}
              >
                <option value="">{allCategories}</option>
                {uniqueCategories.map((category) => {
                  const newString = category.replace(/_/g, " ");
                  const transformedCategory =
                    newString.charAt(0).toUpperCase() + newString.slice(1);
                  return (
                    <option
                      className={styles.category}
                      value={category}
                      key={category}
                    >
                      {transformedCategory}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* /*********************************************************************************       */}
            <div className={styles.inputBlock}>
              <label className={styles.label_name}>Parent Category:</label>
              <input
                className={styles.input}
                type="text"
                name="parentCategory"
                id="input-text"
                required
                spellCheck="false"
                value={input.category}
                onChange={changeHandler}
              />
              {error.name && <p>{error.name}</p>}
            </div>
          </div>
        </div>
        <br />
        <br />
        <button className={styles.enviar} type="submit">
          Create
        </button>
      </form>

      {/* /********************  BOTON BACK  ****************************** * */}
      <br />
      <br />
      <br />

      <div>
        <Link to="/DashBoardAdmin">
          <button className={styles.button}>
            Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
          </button>
        </Link>
      </div>
    </div>
  );
}