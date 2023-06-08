import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {
  
  return (
    <div className={style.mainContainer}>
      <Link className={style.link} to="/">
        <h1 className={style.titleEspecial}>ClotheStore</h1>
      </Link>

      <SearchBar />

      <div className={style.loginSing}>
        <Link className={style.link} to="/login">
          <h1 className={style.titleLogin}>Log in</h1>
        </Link>

        <Link className={style.link} to="/signup">
          <h1 className={style.titleLogin}>Sign up</h1>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
