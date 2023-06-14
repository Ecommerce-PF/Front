import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/actions/actions";




const FavoritesView = () => {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    // Actualiza la lista de productos favoritos cuando el estado del usuario cambia
    // ...
  }, [myFavorites]);

  const handleAddFavorite = () => {
    // Agrega el producto a la lista de favoritos del usuario
    dispatch(addFavorite());
  };

  const handleDeleteFavorite = () => {
    // Elimina el producto de la lista de favoritos del usuario
    dispatch(deleteFavorite());
  };

  return (
    <div>
      <h1>Productos Favoritos</h1>
      {myFavorites.map((favorite) => {
        return (
          <div key={favorite}>
  
            <button onClick={() => handleDeleteFavorite(favorite)}>
              Eliminar de favoritos
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FavoritesView;