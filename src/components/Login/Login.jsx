import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/actions";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Enviar acción de inicio de sesión a Redux
        dispatch(login(data.user));
        // Limpiar campos y mostrar éxito
        setEmail("");
        setPassword("");
        setError("");
        // Aquí puedes realizar otras acciones después de un inicio de sesión exitoso, como redireccionar a otra página
      } else {
        // Manejar error de inicio de sesión
        setError("Invalid email or password");
      }
    } catch (error) {
      // Manejar error de red o del servidor
      setError("Error occurred while logging in");
    }
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