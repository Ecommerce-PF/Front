import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        const response = await fetch("http://localhost:3001/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          alert("Registro exitoso");
          navigate("/login");
          dispatch(signUpUser(user));
        } else {
          alert("Error al registrarse");
        }
      } catch (error) {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section className={styles.back}>
    <div
      className={styles.container}
      style={{ backgroundImage: `url("../../assets/pika.gif")` }}
    >
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <div className={styles.inputBlock}>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="userName" className={styles.label}>
            Username:
          </label>
          <div className={styles.inputBlock}>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              required
            />
          </div>

          {errors.userName && <p className={styles.error}>{errors.userName}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={styles.label}>
            Phone:
          </label>
          <div className={styles.inputBlock}>
            {" "}
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>

          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <div className={styles.inputBlock}>
            {" "}
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <div className={styles.inputBlock}>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>

        <Link to="/">
          <button className={styles.button}>Back</button>
        </Link>
      </form>
    </div>
    </section>
  );
};

export default SignUp;
