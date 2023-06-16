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
        {isFavorite ? (
          <Link onClick={handleDeleteFavorite}>
            {" "}
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
                stroke-width="1.2"
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
                stroke-width="1.2"
              />
            </svg>
          </Link>
        )}
      </Link>
    </div>
  );
};

export default Card;
