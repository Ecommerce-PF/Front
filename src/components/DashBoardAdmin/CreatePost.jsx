import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../redux/actions/actions.js";
import axios from "axios";
import styles from "./CreatePost.module.css";
import { FaArrowLeft } from "react-icons/fa";
import UploadFile from "../UploadFile/UploadFile";

export default function CreatePost() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

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
    image:"",
    category: "",
    parentCategory: "",
    description: "",
  });

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

  const [colors, setColors] = useState([]);
  const addColors = useCallback(
    (event) => {
      event.preventDefault();
      const newColor = { number: colors.length + 1, color: "" };
      setColors((prevColors) => [...prevColors, newColor]);
      setInput((prevInput) => ({ ...prevInput, color: [...colors, newColor] }));
    },
    [colors]
  );

  const [count, setCount] = useState("");

  useEffect(() => {
    const lastNumber = colors[colors.length - 1]?.number;
    if (lastNumber) {
      setCount(lastNumber);
    }
  }, [colors]);

  const changeHandler = useCallback((event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setAllCategories(value);
    }
    setInput((prevInput) => ({
      ...prevInput,
      [name]: name === "id" || name === "price" ? parseInt(value) : value,
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
        .then(() => alert("The clothe was created successfully"));
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

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.statsAndTypes}>
          <div className={styles.stats}>
            <h3>Characteristics</h3>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  className={styles.input}
                  type="number"
                  name="id"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.id}
                  onChange={changeHandler}
                />
                {error.name && <p>{error.name}</p>}
                <span className={styles.placeholder}>Id</span>
              </div>
            </div>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
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
                <span className={styles.placeholder}>Name</span>
              </div>
            </div>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  className={styles.input}
                  type="text"
                  name="parentCategory"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.parentCategory}
                  onChange={changeHandler}
                />
                {error.name && <p>{error.name}</p>}
                <span className={styles.placeholder}>Parent Category</span>
              </div>
            </div>

            <form onSubmit={addColors}>
              <div>
                <label className="name">Colors: {count + 1} </label>
                <label htmlFor="color">Color</label>
                <input
                  className={styles.input}
                  type="text"
                  name="color"
                  id="color"
                  onChange={handleChange}
                  value={input.color.map((color) => color.name).join(", ")}
                />
              </div>
              <div>
                <button className="enviar2" type="submit">
                  Add{" "}
                </button>
              </div>
            </form>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
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
                <span className={styles.placeholder}>Price</span>
              </div>
            </div>
            <div>
              <img
                src={input.image}
                alt="productImage"
                width="90"
                height="110"
              ></img>
              <p></p>
              <UploadFile
                handleUpload={handleUpload}
                folder={"product"}
              ></UploadFile>
            </div>

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
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
                <span className={styles.placeholder}>Description</span>
              </div>
            </div>
          </div>

          <select
            className={styles.select}
            value={input.category}
            name="category"
            onChange={changeHandler}
          >
            <option className={styles.all} value="">
              {allCategories}
            </option>
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
        <button className="enviar" type="submit">
          ENVIAR
        </button>
       
      </form>



      
<Link to="/DashBoardAdmin">
<button className={styles.button}>
  Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
</button>
</Link>
    </div>
  );
}
