import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { admin } from "../../redux/actions/actions";
import Edit from "../../assets/menu.png";

const Card = ({ name, image, id, price }) => {
  const admin = useSelector((state) => state.adminUser);

  if (admin.length === 0) {
    // No hacer nada
  } else {
    localStorage.setItem("admins", admin);
  }

  const userAdmin = localStorage.getItem("admins");

  return (
    <div className={style.mainContainer}>
      {userAdmin === "true" ? (
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
              stroke-width="1.2"
            />
          </svg>
        </Link>
      ) : null}

      <Link className={style.link} to={`/detail/${id}`}>
        <h2 className={style.title}>{name}</h2>
        <img className={style.card} src={image} alt="" />
        <p className={style.price}>${price}</p>
      </Link>
    </div>
  );
};

export default Card;
