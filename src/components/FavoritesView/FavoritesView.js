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

  
  // dar etiqutas de estilos para style.module.css
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
      <NavLink to="/home" className={styles.navlink}>
        <button>Back</button>
      </NavLink>
    </div>
  );
};

export default FavoritesView;
