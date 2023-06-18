import { useSelector } from "react-redux";
import { useState } from "react";
import { Paginado } from "../Paginado/Paginado";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = () => {
  const products = useSelector((state) => state.products);
  const [pagina, setPagina] = useState(1);
  const porPagina = 6;
  const maximo = products.length / porPagina;

  return (
    <div>
      <div className={style.container}>
        {products
          ?.slice(
            (pagina - 1) * porPagina,
            (pagina - 1) * porPagina + porPagina
          )
          .map((product) => {
            console.log(product)
            if (product.isAvaible === false) {
              return null; // No renderizar nada cuando isAvaible es true
            } else {
              return (
                <>
                  <div>
                    <Card
                      key={product.id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      id={product.id}
                    />
                  </div>
                </>
              );
            }
          })}
      </div>
      <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );
};

export default CardsContainer;
