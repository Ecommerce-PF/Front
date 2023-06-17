import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  deleteFavorite,
  getUser,
  deleteProduct,
} from "../../redux/actions/actions";
import Card from "../Card/Card";
import styles from "./favorite.module.css";
import axios from "axios";

const FavoritesView = () => {
  const { id } = useParams();

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`/whishListProduct/${id}`);
        setFavoriteProducts(response.data.Clothes);
      } catch (error) {
        console.error("Error al obtener los productos favoritos", error);
      }
    };

    fetchFavoriteProducts();
  }, [id]);

  return (
    <div className={styles.container_fav}>
      <h1 className={styles.title_fav}>Productos Favoritos</h1>
      {favoriteProducts.map((favorite) => (
        <Card
          key={favorite.id}
          id={favorite.id}
          name={favorite.name}
          image={favorite.image}
          price={favorite.price}
        ></Card>
      ))}
      <NavLink to="/home" className={styles.navlink}>
        <button>Back</button>
      </NavLink>
    </div>
  );
};

export default FavoritesView;
