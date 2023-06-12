import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { admin } from "../../redux/actions/actions";

const Card = ({ name, image, id, price }) => {
  const admin = useSelector((state) => state.adminUser);

  return (
    <div className={style.mainContainer}>
      {admin ? (
        <Link to={`/edit/${id}`}>
          <button>Editar </button>
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
