import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_SNAPS } from "../../queries";
import TimeAgo from "react-timeago";

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
    return (
      <div>
        <div className="description">
          <p className="sub_header__desc">
            simple snap app with <span>react</span>.
          </p>
        </div>

        <div>
          <form>
            <input
              className="add-snap__input"
              onChange={(e) => this.setOnchange(e)}
              name="text"
              type="text"
              placeholder={
                session && session.activeUser ? "add snaps" : "login for snaps"
              }
              disabled={!(session && session.activeUser)}
            />
          </form>
        </div>
        <div>
          <Query query={GET_SNAPS}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading Snaps...</div>;
              return (
                <div>
                  <ul className="snaps">
                    {data.snaps.map((snap) => (
                      <li key={snap._id}>
                        <div className="title">
                          <span className="username">
                            @{snap.user.username}{" "}
                          </span>
                          {snap.text}
                        </div>

                        <div className="date">
                          <span>
                            <TimeAgo date={snap.createdAt} />
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
