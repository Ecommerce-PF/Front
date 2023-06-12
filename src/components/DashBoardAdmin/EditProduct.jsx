import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../redux/actions/actions.js";
import { FaCartArrowDown, FaArrowLeft } from "react-icons/fa";

import styles from "./EditProduct.module.css";
import axios from "axios";



const EditProduct = () => {

/****************************BOTON DE REGRESO***************************** */
    const handleGoBack = () => {
        window.history.back(); // Navegar a la página anterior
      };



/*************************ESTO ES PARA MONTAR LA CARTA*********************************************** */
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state.productDetail);


  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

/*****************************ESTO ES DEL FORMULARIO************************************************ */

const [form , setForm] = useState({
    id: id,
    name: "",
    color: [],
    price: "",
    image: "",
    category: "",
    parentCategory: "",
    description: "",
    stock: "",
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



const handleSubmit = (e) => {
    e.preventDefault();
    try{
        axios.put(`/products/${id}`, form)
        .then((res) => {
            alert("Producto editado con exito");
        }
        )

    }
    catch(error){
    alert("No se pudo editar el producto");
    }

};


  return (
    <>

    ESto es el Edit del ADMIN!!
    
    <div className={styles.mainContainer}>
      <div className={styles.productImg}>
        <h3>{state?.name}</h3>
        <div className={styles.img}>
          <img
            src={state?.image}
            alt={state?.name}
            className={styles.imgProducto}
          />
        </div>
        <div className={styles.buyNow}>
          <h3>BUY NOW</h3>
          <h3>${state?.price}</h3>
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <select type="select" name="color">
            <option>None</option>
            {state?.color &&
              state.color.map((e) => (
                <option
                  className={styles.color}
                  name={e.ColorName}
                  key={e.ColorName}
                >
                  {e.ColorName}
                </option>
              ))}
          </select>

        </div>
      </div>

    
    
    


      

       <div className={styles.details}>
        <div>
          <div dangerouslySetInnerHTML={{ __html: state?.description }}></div>

        </div>

        <div className={styles.cart}>
         
         <button onClick={handleGoBack}>
         Back <FaArrowLeft className={styles.icon} />
         </button>
       
        </div>
      </div>
    </div>

    {/* /**************************************************************************************** */      }
    
    <form action="" onSubmit={handleSubmit} >
         <h1>Editar Producto</h1>

          

            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={handleChange} value={form.name}/>

            <label htmlFor="color">Color</label>
            {/* <input type="text" name="color" id="color" onChange={handleChange} value={form.color}/> */}

            <label htmlFor="color">Color</label>
      <input
        type="text"
        name="color"
        id="color"
        onChange={handleChange}
        value={form.color.map((color) => color.name).join(", ")}
      />


            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" onChange={handleChange} value={form.price}/>

            <label htmlFor="image">Image</label>
            <input type="text" name="image" id="image" onChange={handleChange} value={form.image}/>

            <label htmlFor="category">Category</label>
            <input type="text" name="category" id="category" onChange={handleChange} value={form.category}/>

            <label htmlFor="parentCategory">parentCategory</label>
            <input type="text" name="parentCategory" id="description" onChange={handleChange} value={form.parentCategory}/>

            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" onChange={handleChange} value={form.description}/>

            <label htmlFor="stock">Stock</label>
            <input type="text" name="stock" id="stock" onChange={handleChange} value={form.stock}/>

         
          <button type="submit">
           Save Changes
          </button>


       </form>




    </>
  );
};

  export default EditProduct