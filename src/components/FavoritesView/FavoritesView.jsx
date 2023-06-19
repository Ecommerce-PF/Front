import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./favorite.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFavorites } from "../../redux/actions/actions";

const FavoritesView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const updateFavoritesList = (productId) => {
    setFavoriteProducts((prevFavorites) =>
      prevFavorites.filter((product) => product.id !== productId)
    );
  };
  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`/whishListProduct/${id}`);
        setFavoriteProducts(response.data.Clothes);
        dispatch(setFavorites(response.data.Clothes));
      } catch (error) {
        console.error("Error al obtener los productos favoritos", error);
      }
    };
    fetchFavoriteProducts();
  }, [dispatch,id]);

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
          onUpdateFavorites={updateFavoritesList} // Pasa la función de actualización como prop al componente Card
        />
      ))}
      <Link to="/home" className={styles.navlink}>
        <button className={styles.button}>Back</button>
      </Link>
    </div>
  );
};

export default FavoritesView;
