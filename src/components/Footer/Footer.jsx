import React from "react";
import s from "./Footer.module.css"

export default function Footer() {
  return (
    <div class={s.piepagina}>
      <div class={s.grupo2}>
        <div class={s.box}>
          <figure>
            <a href="#"></a>
          </figure>
        </div>
        <div class={s.box}>
          <h2>SOBRE NOSOTROS</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?
          </p>
        </div>
        <div class={s.box}>
          <h2>SIGUENOS</h2>
          <div class={s.redsocial}>
            <a href="#" class={s.fa }></a>
            <a href="#" class={s.fa }></a>
            <a href="#" class={s.fa }></a>
            <a href="#" class={s.fa }></a>
          </div>
        </div>
      </div>
      <div class={s.grupo2}>
        <small>
          &copy; 2021 <b>SLee Dw</b> - Todos los Derechos Reservados.
        </small>
      </div>
    </div>
  );
}
