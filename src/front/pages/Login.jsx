import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL
  
  const handleLogin = async (e) => {
    e.preventDefault();


    
    try {
      const resp = await fetch(API_URL + "api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!resp.ok) {
        alert("Credenciales inválidas");
        return;
      }

      const data = await resp.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user_id", data.user_id);
      alert("¡Inicio de sesión exitoso!");
      navigate("/private");
    } catch (error) {
      console.error("Login error:", error);
      alert("Hubo un error en el inicio de sesión.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
};

export default Login