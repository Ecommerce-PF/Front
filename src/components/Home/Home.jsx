import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/actions/actions";
import Buttons from "../ButonFilter/ButonFilter";
import CardsContainer from "../CardsContainer/CardsContainer";
import Nav from "../Nav/Nav";

import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Nav />
      <Buttons />
      <CardsContainer />
    </div>
  );
};

export default Home;
