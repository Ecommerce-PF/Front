import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts, getUserById } from "../../redux/actions/actions";
import Buttons from "../ButonFilter/ButonFilter";
import CardsContainer from "../CardsContainer/CardsContainer";
import Nav from "../Nav/Nav";
import WhatsApp from "../WhatsApp/WhatsApp";
import Footer from "../Footer/Footer";
import style from "./Home.module.css";
import loadingGif from "../../assets/loading.gif"

const Home = () => {
  const { id, idBan } = useSelector((state) => ({
    id: state.idUsuario,
    idBan: state.userId,
  }));

  const [loading, setLoading] = useState(true); // Estado de carga

  if (id.length !== 0) localStorage.setItem("ids", id);

  const idUser = localStorage.getItem("ids");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserById(idUser));
        await dispatch(getAllProducts());
        setLoading(false); // Finaliza la carga una vez que se obtienen los datos
      } catch (error) {
        // Manejar errores en la obtención de datos
        console.error("Error al obtener datos:", error);
        setLoading(false); // Finaliza la carga en caso de error
      }
    };

    fetchData();
  }, [dispatch, idUser]);

  return (
    <section>
      {loading ? ( // Muestra un mensaje de carga mientras se obtienen los datos
        <div className={style.loadingContainer}>
        <img className={style.loading} src={loadingGif} alt="loading" />
      </div>
      ) : (
        <>
          {idBan.active === true || idBan.length === 0 ? (
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
        </>
      )}
    </section>
  );
};

export default Home;
