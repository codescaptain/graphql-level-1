import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const Logout = ({ history }) => {
  const setOnClick = (history, client) => {
    localStorage.setItem("token", "");
    history.push("/");
    client.resetStore();
  };
  return (
    <ApolloConsumer>
      {(client) => {
        return (
          <button onClick={() => setOnClick(history, client)}>Logout</button>
        );
      }}
    </ApolloConsumer>
  );
};

export default withRouter(Logout);
