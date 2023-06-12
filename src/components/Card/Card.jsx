import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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

  console.log(
    userAdmin,
    "userAdminuserAdminuserAdminuserAdminuserAdminuserAdminuserAdminuserAdminuserAdminuserAdmin"
  );

  return (
    <div className={style.mainContainer}>
      {userAdmin === "true" ? (
        <Link to={`/edit/${id}`}>
          <img src={Edit} className={style.edit} alt="" />
        </Link>
      ) : (
        null
      )}

      

      <Link className={style.link} to={`/detail/${id}`}>
        <h2 className={style.title}>{name}</h2>
        <img className={style.card} src={image} alt="" />
        <p className={style.price}>${price}</p>
      </Link>
    </div>
  );
};

export default Card;
