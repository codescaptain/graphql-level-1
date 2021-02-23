import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { GET_SNAPS } from "../../queries";
import TimeAgo from "react-timeago";
import { CREATE_SNAP } from "./../../queries/index";

export class Home extends Component {
  state = {
    text: "",
    user_id: "",
  };
  setOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setOnsubmit = (e, createSnap) => {
    e.preventDefault();
    if (!this.ifFormValidate()) {
      createSnap().then();
      this.setState({
        text: "",
      });
    }
  };

  ifFormValidate = () => {
    const { text } = this.state;

    return !text;
  };
  updateCache = (cache, { data: { createSnap } }) => {
    const { snaps } = cache.readQuery({
      query: GET_SNAPS,
    });
    cache.writeQuery({
      query: GET_SNAPS,
      data: {
        snaps: [createSnap, ...snaps],
      },
    });
  };

  componentDidMount() {
    const { session } = this.props;

    if (session && session.activeUser) {
      this.setState({
        user_id: session.activeUser._id,
      });
    }
  }

  render() {
    const { session } = this.props;
    const { text, user_id } = this.state;
    return (
      <div>
        <div className="description">
          <p className="sub_header__desc">
            simple snap app with <span>react</span>.
          </p>
        </div>

        <div>
          <Mutation
            mutation={CREATE_SNAP}
            update={this.updateCache}
            variables={{ text, user_id }}
            optimisticResponse={{
              __typename: "Mutation",
              createSnap: {
                __typename: "Snap",
                _id: Math.round(Math.random() * -200000),
                text: this.state.text,
                createdAt: new Date(),
                user: {
                  __typename: "User",
                  ...session.activeUser,
                },
              },
            }}
            //refetchQueries={[{ query: GET_SNAPS }]}
          >
            {(createSnap, { loading, error }) => (
              <form onSubmit={(e) => this.setOnsubmit(e, createSnap)}>
                <input
                  className="add-snap__input"
                  onChange={(e) => this.setOnchange(e, createSnap)}
                  name="text"
                  type="text"
                  value={text}
                  placeholder={
                    session && session.activeUser
                      ? "add snaps"
                      : "login for snaps"
                  }
                  disabled={!(session && session.activeUser)}
                />
              </form>
            )}
          </Mutation>
        </div>
        <div>
          <Query query={GET_SNAPS}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading Snaps...</div>;
              return (
                <div>
                  <ul className="snaps">
                    {data.snaps.map((snap) => (
                      <li
                        key={snap._id}
                        className={snap._id < 0 ? "optimistic" : ""}
                      >
                        <div className="title">
                          <span className="username">
                            @{snap.user.username}{" "}
                          </span>
                          {snap.text}
                        </div>

                        <div className="date">
                          <span>
                            {snap._id < 0 ? (
                              "sending..."
                            ) : (
                              <TimeAgo date={snap.createdAt} />
                            )}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="counter">{data.snaps.length} snap(s)</div>
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Home;
