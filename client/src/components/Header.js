import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./pages/Logout";

const Header = ({ session }) => {
  return (
    <div class="header">
      <div class="logo">
        <h2 class="logo__title">easysnap</h2>
      </div>

      <div class="header_menu">
        <NavLink to="/" exact>
          snaps
        </NavLink>
        {session.activeUser ? (
          <ActiveUserLogin session={session} />
        ) : (
          <ActiveUserUnLogin />
        )}
      </div>
    </div>
  );
};

const ActiveUserLogin = ({ session }) => (
  <Fragment>
    <NavLink to="/profile">@{session.activeUser.username}</NavLink>
    <Logout />
  </Fragment>
);
const ActiveUserUnLogin = () => (
  <Fragment>
    <NavLink to="/join">join</NavLink>
    <NavLink to="/login">login</NavLink>
  </Fragment>
);

export default Header;
