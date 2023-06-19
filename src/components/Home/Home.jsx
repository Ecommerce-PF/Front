import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts, getUserById } from "../../redux/actions/actions";
import Buttons from "../ButonFilter/ButonFilter";
import CardsContainer from "../CardsContainer/CardsContainer";
import Nav from "../Nav/Nav";
import WhatsApp from "../WhatsApp/WhatsApp";
import Footer from "../Footer/Footer";
import style from "./Home.module.css";

const Home = () => {
  const { id, idBan } = useSelector((state) => ({
    id: state.idUsuario,
    idBan: state.userId,
  }));

  

  if (id.length !== 0) localStorage.setItem("ids", id);

  const idUser = localStorage.getItem("ids");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(idUser));
    dispatch(getAllProducts());
  }, [dispatch,idUser]);

  return (
    <section>
      {idBan.active ? (
        <div className={style.container}>
          <Nav />
          <Buttons />
          <CardsContainer />
          <div className={style.wppContainer}>
            <WhatsApp />
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <h1>USTED ESTA BANEADO</h1>
        </div>
      )}
    </section>
  );
};

export default Home;
