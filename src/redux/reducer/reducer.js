import {
  GET_ALL_PRODUCTS,
  FILTER_BY_CATEGORY,
  GET_BY_NAME,
  FILTER_BY_PRICE,
  FILTER_BY_COLOR,
  RESET_FILTERS,
  GET_DETAIL,
  GET_USER,
  ORDER_BY_PRICE,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  GET_USER_BY_ID,
  GET_USER_ALL,
  ID_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CONSULTA_SI_INICIO,
  LOGIN_WITH_GOOGLE,
  GOOGLE,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  ADD_CART,
  DELETE_CART,
  GET_CART,
  UPDATE_CART,
} from "../actions/actions";

const initialState = {
  products: [],
  allProducts: [],
  productDetail: {},
  users: [],
  user: {},
  cart: [],
  idUsuario: [],
  userId: [],
  adminUser: [],
  priceRange: [0, Infinity],
  iniciado: [],
  google: {},
  myFavorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };

    case GET_BY_NAME:
      if (!action.payload.length) {
        alert("Prod not Found");
      }
      return {
        ...state,
        products: action.payload,
      };

    case FILTER_BY_CATEGORY:
      const { payload: category } = action;
      const { priceRange } = state;

      if (category === "") {
        // No se aplica ningún filtro por categoría
        const filteredByPriceProducts = state.allProducts.filter(
          (product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        return {
          ...state,
          products: filteredByPriceProducts,
        };
      } else {
        // Se aplica el filtro por categoría seleccionada y filtro de precios
        const filteredByCategoryProducts = state.allProducts.filter(
          (product) =>
            product.category === category &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        );
        return {
          ...state,
          products: filteredByCategoryProducts,
        };
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    /* -------------------------------------------------------------------------- */
    case ADD_FAVORITE:
      return {
        ...state,
        myFavorites: [...state.myFavorites, action.payload],
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        myFavorites: state.myFavorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
      };

    /* -------------------------------------------------------------------------- */
    case FILTER_BY_PRICE:
      const { payload: price } = action;
      const filteredByPriceProducts = state.allProducts.filter(
        (product) => product.price >= price[0] && product.price <= price[1]
      );
      return {
        ...state,
        products: filteredByPriceProducts,
        priceRange: price,
      };

    case ORDER_BY_PRICE:
      let sortAsc = action.payload === "asc";
      const sortedPrice = state.allProducts.slice().sort(function (a, b) {
        if (a.price > b.price) {
          return sortAsc ? 1 : -1;
        }
        if (a.price < b.price) {
          return sortAsc ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        products: sortedPrice,
      };

    case FILTER_BY_COLOR:
      const { payload: color } = action;
      if (color === "") {
        return {
          ...state,
          products: state.allProducts,
        };
      } else {
        const filteredByColorProducts = state.allProducts.filter((product) => {
          if (product.color && product.color.length > 0) {
            return product.color.some(
              (c) =>
                c.ColorName && c.ColorName.toLowerCase() === color.toLowerCase()
            );
          }
          return false;
        });
        return {
          ...state,
          products: filteredByColorProducts,
        };
      }

    case GET_USER_BY_ID:
      return { ...state, userId: action.payload };

    case RESET_FILTERS:
      return {
        ...state,
        products: state.allProducts,
      };

    case GET_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case GET_USER_ALL:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case DELETE_PRODUCT_SUCCESS:
      const updatedProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: updatedProducts,
      };

    case DELETE_PRODUCT_FAILURE:
      alert("Ha ocurrido un error al eliminar la prenda");
      return state;

    case DELETE_USER_SUCCESS:
      const updatedUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        users: updatedUsers,
      };

    case DELETE_USER_FAILURE:
      alert("Ha ocurrido un error al eliminar el usuario");
      return state;

    case ID_USER:
      return {
        ...state,
        idUsuario: action.payload,
      };

    case CONSULTA_SI_INICIO:
      return {
        ...state,
        iniciado: action.payload,
      };

    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        google: action.payload,
      };

    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_CART:
      return {
        ...state,
        cart: action.payload,
      }

    case DELETE_CART:
      return {
        ...state,
        cart: action.payload,
      }

    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      }

    default:
      return state;
  }
};

export default rootReducer;
