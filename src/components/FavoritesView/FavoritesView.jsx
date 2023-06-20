import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Card/Card";
import styles from "./favorite.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, deleteFavorite } from "../../redux/actions/actions";

const FavoritesView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const [isFav, setIsFav] = useState(false);
const favorites = useSelector((state) => state.favorites);
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
  }, [dispatch, id]);

  

  const handleDeleteFavorite = async (productId) => {

    const form = {
      id: productId, //esta garcha no quiere andar
      UserId: id, //esto me lo traje de params
    };
    dispatch(deleteFavorite(productId));
    try {
      await axios.delete('/whishListProduct', {
        data: form,
      });
      setIsFav(!isFav);
      updateFavoritesList(productId);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  

  return (
    <>
      <div className={styles.container_fav}>
        <h1 className={styles.title_fav}>Productos Favoritos</h1>
        <div>
          {favoriteProducts.map((favorite) => (
            <Card
              key={favorite.id}
              id={favorite.id}
              name={favorite.name}
              image={favorite.image}
              price={favorite.price}
              onUpdateFavorites={updateFavoritesList} // Pasa la función de actualización como prop al componente Card
              onClick={()=> handleDeleteFavorite(favorite.id)} // Pasa la función de eliminar como prop al componente Card
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
