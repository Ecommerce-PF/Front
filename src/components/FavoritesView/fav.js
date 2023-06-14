// crear la funcion de agregar a favoritos los productos de la base de datos y que se muestren en el componente de favoritos
// que guarde en local storage los productos favoritos del usuario y que se muestren en el componente de favoritos
// que se pueda eliminar los productos de favoritos
// que se pueda agregar al carrito los productos de favoritos
// que se pueda agregar al carrito los productos de la base de datos

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteProduct } from "../../redux/actions/actions";
// import "./fav.css";


const Fav = () => {
    const dispatch = useDispatch();
    const fav = useSelector((state) => state.fav);
    const user = useSelector((state) => state.user);
    const [favProducts, setFavProducts] = useState([]);
    
    useEffect(() => {
        dispatch(getUser(user.id));
    }, []);
    
    useEffect(() => {
        setFavProducts(user.products);
    }, [user]);
    
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };
    
    return (
        <div>
        <div className="fav-container">
            <div className="fav-products">
            {favProducts &&
                favProducts.map((product) => (
                <div className="fav-product" key={product.id}>
                    <div className="fav-product-img">
                    <img src={product.image} alt={product.name} />
                    </div>
                    <div className="fav-product-info">
                    <div className="fav-product-name">
                        <h3>{product.name}</h3>
                    </div>
                    <div className="fav-product-price">
                        <p>${product.price}</p>
                    </div>
                    <div className="fav-product-buttons">
                        <button
                        className="fav-product-button"
                        onClick={() => handleDelete(product.id)}
                        >
                        <i className="fas fa-trash-alt"></i>
                        </button>
                        <button className="fav-product-button">
                        <i className="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </div>
    );
}
    

export default Fav;