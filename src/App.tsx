import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import { userActions } from "./store";
import "./App.css";
import { useDispatch } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import { WebsocketProvider } from "./contexts/WebsocketContext";
import { socket } from "./contexts/WebsocketContext";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			dispatch(userActions.login(token));
			dispatch(userActions.setAccessToken(token));
		}
	});

	return (
		<WebsocketProvider value={socket}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/todos"
						element={
							<PrivateRoute>
								<TodoList />
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</WebsocketProvider>
	);
}

export default App;
