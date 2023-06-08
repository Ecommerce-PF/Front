import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/actions/actions";
import styles from "./SignUp.module.css"; // Importar el módulo CSS

const SignUp = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUser(user);
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Aquí realizas la llamada al backend para guardar la información del usuario
        const response = await fetch("http://localhost:3001/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          // La solicitud se completó con éxito, puedes mostrar un mensaje de éxito al usuario
          alert("Registro exitoso");
          // También puedes redirigir al usuario a otra página, como la página de inicio de sesión
          // window.location.href = "/login";

          // Dispatch de la acción signUpUser
          dispatch(signUpUser(user));
        } else {
          // Si la solicitud no fue exitosa, puedes manejar el error aquí
          // Por ejemplo, mostrar un mensaje de error al usuario o registrar el error en el backend
          alert("Error al registrarse");
        }
      } catch (error) {
        // Si se produce un error durante la solicitud, puedes manejarlo aquí
        // Por ejemplo, mostrar un mensaje de error genérico o registrar el error en el backend
        alert("Error al procesar la solicitud");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateUser = (user) => {
    const errors = {};

    if (!user.name.trim()) {
      errors.name = "Name is required";
    }

    if (!user.userName.trim()) {
      errors.userName = "Username is required";
    }

    if (!user.phone.trim()) {
      errors.phone = "Phone is required";
    }

    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(user.email)) {
      errors.email = "Invalid email format";
    }

    if (!user.password.trim()) {
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Validación simple de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url("../../assets/pika.gif")` }}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="userName" className={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={user.userName}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.userName && <p className={styles.error}>{errors.userName}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={styles.label}>
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;