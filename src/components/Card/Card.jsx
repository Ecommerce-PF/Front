import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/actions/actions";

const Card = ({ name, image, id, price }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const favorites = useSelector((state) => state.myFavorites);
  const isFavorite = favorites.some((product) => product.id === id);
  const admin = useSelector((state) => state.adminUser);

  if (admin.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("adminUser", JSON.stringify(admin));
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const userAdmin = JSON.parse(localStorage.getItem("adminUser"));

  const handleAddFavorite = () => {
    dispatch(addFavorite({ id, name, image, price }));
  };

  const handleDeleteFavorite = () => {
    dispatch(deleteFavorite(id));
  };

  return (
    <div className={style.mainContainer}>
      {userAdmin ? (
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
      </Link>
      {isFavorite ? (
        <button onClick={handleDeleteFavorite}>Remove from Favorites</button>
      ) : (
        <button onClick={handleAddFavorite}>Add to Favorites</button>
      )}
    </div>
  );
};

export default Card;