<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Suscribirse a los cambios en el estado de autenticación
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setUser(user);
      } else {
        // El usuario ha cerrado sesión
        setUser(null);
      }
    });

    // Limpiar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  if (user) {
    return (
      <div>
        <h1>Información del usuario</h1>
        <p>Nombre: {user.displayName}</p>
        <p>Email: {user.email}</p>
        <p>ID: {user.uid}</p>
      </div>
    );
  } else {
    return <p>No has iniciado sesión.</p>;
  }
};

export default UserProfile;
=======
>>>>>>> b7ce3a4b58a50fab102ab14032d010e5acabc863
