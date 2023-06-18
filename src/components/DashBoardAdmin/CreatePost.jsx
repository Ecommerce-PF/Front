import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
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
    image: "https://marketplace.canva.com/EAFBKs7K_lE/1/0/1600w/canva-colorful-variety-of-clothes-hanging-on-rack-new-arrival-instagram-post-wBkgRMEh93E.jpg",
    category: "",
    parentCategory: "",
    description: "",
  });
  
  
 const idGenerator = ()=> {
    setInput(prevInput => ({
      ...prevInput,
      id: prevInput.id + 1,
     }));

 console.log(input.id)
  }
  useEffect(() => {
    setInput(prevInput => ({
      ...prevInput,
      id: prevInput.id + 1,
     }));
   }, []);
  
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
  
    if (name === "color") {
      const colorsArray = value.split(",").map((color) => ({
        name: color.trim(),
        // otros atributos que necesites para el color
      }));
  
      setInput(prevInput => ({
        ...prevInput,
        [name]: colorsArray,
      }));
    } else {
      setInput(prevInput => ({
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
      idGenerator();
      axios
        .post("/products", input)
        .then(() =>
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your clothe has been saved successfully',
          showConfirmButton: false,
          timer: 1500
        }))
        .then(() => navigate(`/detail/${input.id}`)) 
        .catch(error => alert(error));

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
    <div className={styles.body_container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.statsAndTypes}>
          <div className={styles.stats}>
            <h3>Characteristics</h3>

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


              <div>
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
