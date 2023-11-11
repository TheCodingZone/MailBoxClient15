import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./Header.css";
import { authActions } from "../../store/AuthSlice";
import { AiOutlineUser } from "react-icons/ai";
import { mailAction } from "../../store/MailSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const email = localStorage.getItem("email")
  // const email = useSelector((state) => state.auth.email);

  const deleteHandler = () => {
    dispatch(authActions.logout());
    props.click()
    // dispatch(mailAction.replaceMails());
  };

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/home" className="nav_logo">
          MAILBOX
        </NavLink>
        {loginStatus && (
          <h5>
            <AiOutlineUser className="user" />{" "}
            {email?.replace("@gmail.com", "")}
          </h5>
        )}
        <NavLink to="/auth">
          {loginStatus ? (
            <button className="button" onClick={deleteHandler}>
              Log out
            </button>
          ) : (
            <button className="button" to="/auth">
              Log in
            </button>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
