import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // No hay token -> redirigir al login
      navigate("/login");
      return;
    }

    // Token existe -> hacemos fetch a ruta protegida
    fetch(API_URL + "api/private", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Token inválido");
        return resp.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error(error);
        navigate("/login"); // Token inválido -> redirigir
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Área privada</h2>
      <p>{message ? message : "Cargando..."}</p>
    </div>
  );
};