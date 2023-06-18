import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/actions/actions";
import Card from "../Card/Card";
import { getUser, deleteProduct } from "../../redux/actions/actions";
import styles from "./favorite.module.css";

// crear un boton de back para regresar a favoritos
const FavoritesView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [favProducts, setFavProducts] = useState([]);
  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    dispatch(getUser(user.id));
  }, []);

  useEffect(() => {
    setFavProducts(user.products);
  }, [user]);

  useEffect(() => {
    // Actualiza la lista de productos favoritos cuando el estado del usuario cambia
  }, [myFavorites]);

  const handleAddFavorite = () => {
    // Agrega el producto a la lista de favoritos del usuario
    dispatch(addFavorite());
  };

  const handleDeleteFavorite = (id) => {
    dispatch(deleteFavorite(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  // dar etiqutas de estilos para style.module.css
  return (
    <div className={styles.favorite_container}>
      <div>
        <h1 className={styles.title_fav}>Productos Favoritos</h1>
      </div>
      <div className={styles.container_fav}>
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
      </div>
        <NavLink to="/home" className={styles.fav_back}>
          <button className={styles.back_button}
          >Back</button>
        </NavLink>
    </div>
  );
};

export default FavoritesView;
