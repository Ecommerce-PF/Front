import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import Carousel from "./Carrusel/Carousel";

export default function LandingPage() {
  return (
    <section className={s.back}>
      <div className={s.body}>
        <div className={s.titles}>
          <h1 className={s.title}>THRIFT SHOP</h1>
          <h1 className={s.text}>should be better</h1>
        </div>

        <div className={s.divTextBtn}>
          <div className={s.btnContainer}>
            <Link className={s.btnS} to="/login">
              <button className={s.btn}>Log In</button>
            </Link>
            <Link className={s.btnS} to="/signup">
              <button className={s.btn}>Sign Up</button>
            </Link>
          </div>
          <Carousel />
        </div>
      </div>
    </section>
  );
}
