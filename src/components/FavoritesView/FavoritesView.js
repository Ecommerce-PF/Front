import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavorite, getUser } from "../../redux/actions/actions";

import Card from "../Card/Card";
import styles from "./favorite.module.css";
import { FaArrowLeft } from "react-icons/fa";

// crear un boton de back para regresar a favoritos
const FavoritesView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [favProducts, setFavProducts] = useState([]);
  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    dispatch(getUser(user.id));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFavProducts(user.products);
  }, [user]);

  useEffect(() => {
    // Actualiza la lista de productos favoritos cuando el estado del usuario cambia
  }, [myFavorites]);


  const handleDeleteFavorite = (id) => {
    dispatch(deleteFavorite(id));
  };


  return (
    <div className={styles.container_fav}>
      <h1 className={styles.title_fav}>Productos Favoritos</h1>
      {myFavorites.map((favorite) => {
        return (
          <Card
            key={favorite.id}
            id={favorite.id}
            name={favorite.name}
            image={favorite.image}
            price={favorite.price}
          >
            <button onClick={() => handleDeleteFavorite(favorite.id)}>
              Eliminar
            </button>
          </Card>
        );
      })}
      
      <Link to="/home">
        <button className={styles.button}>
          Back <FaArrowLeft className={styles.icon}></FaArrowLeft>
        </button>
      </Link>
    </div>
  );
};

export default FavoritesView;
