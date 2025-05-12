import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
    const token = sessionStorage.getItem("token");

    return (
        <div className="container text-center mt-5">
            <h1 className="display-4 fw-bold text-primary mb-4">
                ¡Bienvenido a tu App con Autenticación JWT!
            </h1>

            <p className="lead mb-4">
                Esta aplicación demuestra cómo funciona la autenticación con tokens JWT usando Flask + React.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">

                {!token ? (
                    <>
                        <Link to="/login">
                            <button className="btn btn-primary">Iniciar sesión</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-success">Registrarse</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/private">
                            <button className="btn btn-warning">Ir al área privada</button>
                        </Link>
                        <button className="btn btn-danger" onClick={() => {
                            sessionStorage.removeItem("token");
                            window.location.reload();
                        }}>
                            Cerrar sesión
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};