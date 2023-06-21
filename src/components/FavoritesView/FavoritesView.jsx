import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./favorite.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, getFavorites } from "../../redux/actions/actions";

const FavoritesView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const favorites = useSelector((state) => state.myFavorites);
  const [defaultFavorites, setDefaultFavorites] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(`/whishListProduct/${id}`);
        dispatch(setFavorites(response.data.Clothes));
      } catch (error) {
        console.error("Error al obtener los productos favoritos", error);
      }
    };
    fetchFavoriteProducts();
  }, [dispatch, id]);


  useEffect(() => {
    if (defaultFavorites) {
      dispatch(getFavorites(id));
      setDefaultFavorites(false);
    }
  }, [dispatch, defaultFavorites, id]);

  return (
    <>
      <div className={styles.container_fav}>
        <h1 className={styles.title_fav}>Productos Favoritos</h1>
        <div className={styles.containerCards}>
          {favorites.map((favorite) => (
            <Card
              key={favorite.id}
              id={favorite.id}
              name={favorite.name}
              image={favorite.image}
              price={favorite.price}
              idUserFav={id}
            />
          ))}
        </div>
      </div>

      <div>
        <Link to="/home" className={styles.navlink}>
          <button className={styles.back_button}>Back</button>
        </Link>
      </div>
    </>
  );
};

export default FavoritesView;