import React from "react";
import { db, auth, storage } from "./FireBase";
import { collection, addDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Form from "./Componentes/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Se ha iniciado sesión!");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await createUserWithEmailAndPassword (auth, email, password);
      alert("Registro con éxito!");
    } catch (error) {
      alert("Se produjo un error en el registro: " + error.message);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      let fileURL = null;
      if (data.file) {
        const storageRef = ref(storage, `uploads/${data.file.name}`);
        await uploadBytes(storageRef, data.file);
        fileURL = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, "usuarios"), {
        name: data.name,
        email: data.email,
        fileURL,
      });
      
      alert("Los datos han sido registrados exitosamente!");
    } catch (error) {
      console.error("Se produjo un error al guardar los datos:", error);
      alert("Se ha generado un problema al guardar los datos.");
    }  
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleFormSubmit} />
    </div>

  );
}

export default App;
