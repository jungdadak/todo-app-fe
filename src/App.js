import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api.js";

function App() {
	const [user, setUser] = useState(null);
	const getUser = async () => {
		try {
			const storedToken = localStorage.getItem("token");
			if (storedToken) {
				const response = await api.get("/user/me");
				console.log("res", response);
			}
		} catch (error) {}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute user={user}>
						<Route path="/" element={<TodoPage />} />
					</PrivateRoute>
				}
			></Route>

			<Route path="/register" element={<RegisterPage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	);
}

export default App;
