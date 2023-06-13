import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { validate } from "./validator.js";
import { createPost, getAllProducts } from "../../redux/actions/actions.js";
import axios from "axios";
import styles from "./CreatePost.module.css";

export default function CreatePost() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const [categories, setCategories] = useState(uniqueCategories);
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
    image: "",
    category: "",
    parentCategory: "",
    description: "",
  });

  const [colores, setColores] = useState({
    color: "",
  });





  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      const colorsArray = value.split(",").map((color) => ({
        name: color.trim(),
        // otros atributos que necesites para el color
      }));

      setInput((prevForm) => ({
        ...prevForm,
        [name]: colorsArray,
      }));
    } else {
      setInput((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const [colors, setColors] = useState([]);
  const addColors = (event) => {
    event.preventDefault();
    const newColor = { number: colors.length + 1, color: colores.color };
    setColors([...colors, newColor]);
    setInput({ ...input, color: [...colors, newColor] });
  };

  const [count, setCount] = useState("");

  useEffect(() => {
    const lastNumber = colors[colors.length - 1]?.number;
    if (lastNumber) {
      setCount(lastNumber);
    }
  }, [colors]);


  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setAllCategories(value);
    }
    setInput({
      ...input,
      [name]: name === "id" || name === "price" ? parseInt(value) : value,
    });
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/products", input)
      .then(() => alert("The recipe was created successfully"));
  };

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

            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                className={styles.input}
                  type="text"
                  name="image"
                  id="input-text"
                  required
                  spellCheck="false"
                  value={input.image}
                  onChange={changeHandler}
                />
                {error.image && <p>{error.image}</p>}
                <span className={styles.placeholder}>Image Link: </span>
              </div>
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
        <div className={styles.nav}>
          <Link to="/home">
            <button className={styles.button}>Back</button>
          </Link>
        </div>
      </form>

    </div>
  );
}
