import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "./../../queries/index";
import { withRouter } from "react-router-dom";
class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  setOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  setOnsubmit = (e, signIn) => {
    e.preventDefault();
    signIn().then(async ({ data }) => {
      localStorage.setItem("token", data.signIn.token);
      await this.props.refetch();
      this.props.history.push("/");
    });
    this.setState({
      username: "",
      password: "",
    });
  };
  formValidate = () => {
    const { username, password } = this.state;
    const isValid = !username || !password;
    return isValid;
  };
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signIn, { loading, error }) => (
            <form
              class="user-form"
              onSubmit={async (e) => {
                this.setOnsubmit(e, signIn);
              }}
            >
              <label>
                <input
                  onChange={this.setOnChange}
                  type="text"
                  placeholder="username"
                  name="username"
                  value={username}
                />
              </label>
              <label>
                <input
                  onChange={this.setOnChange}
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                />
              </label>
              <label>
                <button disabled={loading || this.formValidate()}>Login</button>
              </label>
              {loading && <div>loading....</div>}
              {error && <div>Hata...</div>}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}
export default withRouter(Login);
