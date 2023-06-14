import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { idUser, admin } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { iniciado } from "../../redux/actions/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isBanned, setIsBanned] = useState(false); // Estado para controlar si el usuario está baneado
  const [isActions, setIsActions] = useState(true); // Estado para controlar si el usuario tiene permisos de acciones

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const inicio = () => {
    const e = "si";
    dispatch(iniciado(e));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Please enter your username and password");
      return;
    }

    if (!isActions) {
      setError("You are not allowed to login.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.user.id;
        const trueOrFalse = data.user.admin;
        const banned = data.user.isActive; // Obtener el estado de baneo del usuario

        if (banned) {
          setIsBanned(true); // Establecer el estado de baneo a true
          return;
        }

        await dispatch(login(data.user));
        await dispatch(idUser(userId));
        await dispatch(admin(trueOrFalse));
        setUserName("");
        setPassword("");
        setError("");
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error occurred while logging in");
    }
  };

  return (
    <section className={styles.back}>
      <div className={styles.body}>
        {isBanned && <p className={styles.bannedMessage}>¡Usuario baneado! No puedes iniciar sesión.</p>}
        {!isBanned && (
          <form className={styles.forms} onSubmit={handleSubmit}>
            <div className={styles.nav}>
              <h1>Login</h1>
            </div>

            <div className={styles.statsAndTypes}>
              <div className={styles.stats}>
                <div className={styles.centralize}>
                  <div className={styles.inputBlock}>
                    <input
                      type="text"
                      name="username"
                      id="input-username"
                      required
                      value={userName}
                      onChange={handleUserNameChange}
                    />
                    <span className={styles.placeholder}>Username</span>
                  </div>
                </div>

                <div className={styles.centralize}>
                  <div className={styles.inputBlock}>
                    <input
                      type="password"
                      name="password"
                      id="input-password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span className={styles.placeholder}>Password</span>
                  </div>
                </div>

                <div className={styles.centralize}>
                  <div className={styles.inputBlock}>
                    <input
                      type="checkbox"
                      name="isActions"
                      id="input-is-actions"
                      checked={isActions}
                      onChange={() => setIsActions(!isActions)}
                    />
                    <label htmlFor="input-is-actions">Is Actions</label>
                  </div>
                </div>

                {error && <p className={styles.error}>{error}</p>}
              </div>

              <div className={styles.buttons}>
                <div className={styles.types}>
                  <button onClick={inicio} type="submit" className={styles.button}>
                    Login
                  </button>
                </div>

                <div className={styles.types}>
                  <Link to="/">
                    <button className={styles.button}>Back</button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Login;