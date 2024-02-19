import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/index";
import { RootState } from "../store/index";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("accessToken");
    dispatch(userActions.logout());
    dispatch(userActions.setAccessToken(''));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">To-Do Manager</Link>
        <div className="" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!isLoggedIn &&  (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="sign-out-item">
                <button
                  className="nav-link"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
