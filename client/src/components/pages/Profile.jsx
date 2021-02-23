import React from "react";
import Moment from "react-moment";
import auth from "./auth";

const Profile = ({ session: { activeUser } }) => {
  return (
    <div>
      <b>Profile</b>
      <br />
      <Moment date={activeUser.createdAt} format="YYYY/MM/DD"></Moment>
      <br />
      <h2>{activeUser.username}s</h2>
    </div>
  );
};

export default auth((session) => session && session.activeUser)(Profile);
