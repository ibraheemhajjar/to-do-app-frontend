import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../api/auth/authService";
import { userActions } from "../store/index";
import { ToastContainer } from "react-toastify";
const Login: React.FC = () => {

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector( (state: RootState) => state.user.isLoggedIn );

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/todos");
		}
	}, [isLoggedIn, navigate]);

	const handleLogin = async ( event: React.MouseEvent<HTMLButtonElement> ): Promise<void> => {
		event.preventDefault();
		const response = await authService.login(email, password);
		const accessToken = response?.data?.accessToken;
		if (response.executedSuccessfully) {
			dispatch(userActions.login(accessToken));
		}
	};

	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Login</h3>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Enter email"
							onChange={(event) =>
								setEmail(event.target.value)
							}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Enter password"
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button
							className="btn btn-primary"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
					<p className="forgot-password text-right mt-2">
						Don't have an account?{" "}
						<Link to={"/register"}>Register</Link> Instead
					</p>
				</div>
			</form>
			<ToastContainer />
		</div>
		
	);
};

export default Login;
