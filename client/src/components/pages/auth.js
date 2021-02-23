import React, { Component } from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { GET_ACTIVE_USER } from "./../../queries/index";

const auth = (condition) => (Component) => (props) => (
  <Query query={GET_ACTIVE_USER}>
    {({ data, loading }) => {
      if (loading) {
        return null;
      }
      return condition(data) ? <Component {...props} /> : <Redirect to="/" />;
    }}
  </Query>
);

export default auth;
