import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

const SignUp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB5fkHI-K8lcyC8U8TSDfnjkqFjMZ6mmTQ",
    authDomain: "clothestore-8ead6.firebaseapp.com",
    projectId: "clothestore-8ead6",
    storageBucket: "clothestore-8ead6.appspot.com",
    messagingSenderId: "86387538325",
    appId: "1:86387538325:web:9e422e0928cf885f689e9c",
    measurementId: "G-JSSCSKPYD9",
  };
  initializeApp(firebaseConfig);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const [googleUser, setGoogleUser] = useState({
    name: "",
    userName: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
  });

  const [google, setGoogle] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setGoogle(false);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUser(user);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("/users/signup", user).then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your count have beeen registered succesfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Al parecer tu cuenta ya se encuentra registrada...",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
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

  const provider = new GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  const auth = getAuth();

  async function callLoginGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const users = result.user;
      
      setGoogleUser({
        name: users.displayName,
        userName: users.displayName,
        phone: "12212",
        email: users.email,
        password: users.accessToken,
        profileImage: users.photoURL,
      });
      setGoogle(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }

  useEffect(() => {
    if (google) {
      try {
        axios
          .post("/users/signup", googleUser)

          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your count have been registered succesfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          })
          .catch((res) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Al parecer tu cuenta ya se encuentra registrada...",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user, google]);

  return (
    <section className={styles.back}>
      <div className={styles.container}>
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

            {errors.userName && (
              <p className={styles.error}>{errors.userName}</p>
            )}
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

            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <button type="submit" className={styles.button}>
            Sign Up
          </button>

          <Link to="/">
            <button className={styles.button}>Back</button>
          </Link>
        </form>
      </div>
      <div className={styles.loginGoogle}>
        <Link onClick={callLoginGoogle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="80px"
            height="80px"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
