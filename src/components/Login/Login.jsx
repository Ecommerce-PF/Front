//import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";


import { getUserByEmail, login } from "../../redux/actions/actions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    // Obtener información del usuario por correo electrónico
    dispatch(getUserByEmail(email))
      .then((user) => {
        // Verificar si el usuario existe y la contraseña es correcta
        if (user && user.password === password) {
          // Enviar solicitud de inicio de sesión
          dispatch(login(email, password))
            .then(() => {
              // Limpiar campos y mostrar éxito
              setEmail("");
              setPassword("");
              setError("");
              // Aquí puedes realizar otras acciones después de un inicio de sesión exitoso, como redireccionar a otra página
            })
            .catch((error) => {
              // Mostrar error de inicio de sesión
              setError(error.message);
            });
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Error occurred while retrieving user information");
      });
  };

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit}>
        <div className={styles.nav}>
          <h1>Login</h1>
        </div>

        <div className={styles.statsAndTypes}>
          <div className={styles.stats}>
            <div className={styles.centralize}>
              <div className={styles.inputBlock}>
                <input
                  type="email"
                  name="email"
                  id="input-email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
                <span className={styles.placeholder}>Email</span>
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

            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.types}>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;