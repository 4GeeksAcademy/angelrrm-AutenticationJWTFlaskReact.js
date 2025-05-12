import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkLogin = () => {
			const token = sessionStorage.getItem("token");
			setIsLoggedIn(!!token);
		};

		checkLogin();
		window.addEventListener("storage", checkLogin);
		return () => window.removeEventListener("storage", checkLogin);
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_id");
		setIsLoggedIn(false);
		navigate("/login");
	};

	return (
		<nav className="navbar navbar bg-dark">
			<div className="ml-auto">
				{isLoggedIn ? (
					<button className="btn btn-danger" onClick={handleLogout}>
						Cerrar sesión
					</button>
				) : (
					<Link to="/login">
						<button className="btn btn-primary">Iniciar sesión</button>
					</Link>
				)}
			</div>
		</nav>
	);
};