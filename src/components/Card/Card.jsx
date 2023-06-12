import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Card = ({ name, image, id, price }) => {

  const isAdmin = useSelector((state) => state.user.admin);


  return (
    <div className={style.mainContainer}>
      {
        isAdmin ? (

          <Link to={`/edit/${id}`}>
        <button>Editar </button>
           </Link>
        ) : null

      }

          <Link to={`/edit/${id}`}>
        <button>Editar </button>
           </Link>
        <Link className={style.link} to={`/detail/${id}`}>
          <h2 className={style.title}>{name}</h2>
          <img className={style.card} src={image} alt="" />
          <p className={style.price}>${price}</p>
        </Link>
      
    </div>
  );
};

export default Card;
