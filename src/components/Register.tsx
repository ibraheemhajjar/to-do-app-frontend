import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authService from "../api/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";

const Register: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const isLoggedIn = useSelector( (state: RootState) => state.user.isLoggedIn );

  useEffect(()=> {
    if (isLoggedIn) {
      navigate('/todos')
    }
  },[isLoggedIn,navigate])
 
  const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) :Promise<void> => {
    event.preventDefault();
		const response = await authService.register(email, password, confirmPassword);
    if (response.executedSuccessfully) {
			navigate('/')
		}
  };

  return (
    <div className="Auth-form-container">
    <form className="Auth-form">
         <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="form-group mt-3">
                   <label>Email address</label>
                   <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                   />
              </div>
              <div className="form-group mt-3">
                   <label>Password</label>
                   <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        onChange={(event) => setPassword(event.target.value)}
                   />
              </div>
              <div className="form-group mt-3">
                   <label>Confirm Password</label>
                   <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                   />
              </div>

              <div className="d-grid gap-2 mt-3">
                   <button type="submit" onClick={handleSignUp} className="btn btn-primary">
                        Sign Up
                   </button>
              </div>
              <p className="forgot-password text-right mt-2">
                   Have an Account? <Link to={"/"}>LogIn</Link> Instead
              </p>
         </div>
    </form>
    <ToastContainer />
</div>
);
};

export default Register;
