import React, { Component } from "react";
import { CREATE_USER } from "./../../queries/index";
import { Mutation } from "react-apollo";
import { Error } from "./Error";
import { withRouter } from "react-router-dom";

class Join extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
  };
  setOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setOnsubmit = (e, createUser) => {
    e.preventDefault();
    createUser().then(async ({ data }) => {
      localStorage.setItem("token", data.createUser.token);
      await this.props.refetch();
      this.props.history.push("/");
    });

    this.setState({
      username: "",
      password: "",
      passwordConfirm: "",
    });
  };
  formValidate = () => {
    const { username, password, passwordConfirm } = this.state;
    const isValid =
      !username ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm;
    return isValid;
  };
  render() {
    const { username, password, passwordConfirm } = this.state;
    return (
      <div>
        <Mutation mutation={CREATE_USER} variables={{ username, password }}>
          {(createUser, { loading, error }) => (
            <form
              onSubmit={(e) => {
                this.setOnsubmit(e, createUser);
              }}
              className="user-form"
            >
              <label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  name="username"
                  onChange={this.setOnChange}
                />
              </label>
              <label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  name="password"
                  onChange={this.setOnChange}
                />
              </label>
              <label>
                <input
                  type="password"
                  placeholder="confirm password"
                  value={passwordConfirm}
                  name="passwordConfirm"
                  onChange={this.setOnChange}
                />
              </label>
              <label>
                <button disabled={loading || this.formValidate()}>Join</button>
              </label>
              {loading && <div>Loading...</div>}
              {error && <div>Kullanıcı Var</div>}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}
export default withRouter(Join);
