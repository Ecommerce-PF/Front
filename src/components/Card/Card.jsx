

import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite, setFavorites } from "../../redux/actions/actions";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Card = ({ name, image, id, price, onUpdateFavorites }) => {
  const iniciado = useSelector((state) => state.iniciado);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const favorites = useSelector((state) => state.myFavorites);
  const [isFavorite, setIsFavorite] = useState(favorites.some((product) => product.id === id));


  
  if (iniciado?.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("sesions", iniciado);
  }

  const sesions = localStorage.getItem("sesions");


  const [form, setForm] = useState({
    id: id,
    UserId: userId.id,
  });

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`/whishListProduct/${id}`);
      } catch (error) {
        console.error("Error al obtener los productos favoritos", error);
      }
    };

    fetchFavoriteProducts();
  }, []);

  const handleAddFavorite = async () => {
    dispatch(addFavorite({ id, name, image, price }));
    try {
      const reponse = await axios.post("/whishListProduct",form );
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You add to favorites',
        showConfirmButton: false,
        timer: 800
      })
      // alert("se agrego");
    } catch (error) {
      // Handle the error here
    }
  };


  const handleDeleteFavorite = async () => {
    dispatch(deleteFavorite(id));
    const deleteForm = {
      id: id,
      UserId: userId.id,
    };

    try {
      await axios.delete(`/whishListProduct/`, {
        data: deleteForm,
      });
      onUpdateFavorites(id); // Llama a la función de actualización para eliminar la carta de la lista de favoritos en FavoritesView
      // ...
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  

  const isFavorites = favorites.some((product) => product.id === id);

  return (
    <div>
      <div className={style.mainContainer}>
        {userId.admin && sesions === "si" ? (
          <Link to={`/edit/${id}`}>
            <svg
              className={style.svg}
              width="50px"
              height="50px"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7L18 10M6 19L7 15L17 5L20 8L10 18L6 19Z"
                stroke="#121923"
                strokeWidth="1.2"
              />
            </svg>
          </Link>
        ) : null}
        <Link className={style.link} to={`/detail/${id}`}>
          <h2 className={style.title}>{name}</h2>
          <img className={style.card} src={image} alt="" />
          <p className={style.price}>${price}</p>
          {isFavorites ? (
            <Link value={id} onClick={handleDeleteFavorite}>
              <svg
                className={style.svg2}
                width="47px"
                height="47px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
                  fill="#121923"
                  stroke="#121923"
                  strokeWidth="1.2"
                />
              </svg>
            </Link>
          ) : (
            <Link className={style.buttonFav} onClick={handleAddFavorite}>
              <svg
                className={style.svg2}
                width="47px"
                height="47px"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
                  stroke="#121923"
                  strokeWidth="1.2"
                />
              </svg>
            </Link>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Card;