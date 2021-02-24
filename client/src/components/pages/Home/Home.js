import React, { Component } from "react";
import JoinUs from "./JoinUs";

import NewSnapForm from "./NewSnapForm";
import SnapList from "./SnapList";

export class Home extends Component {
  render() {
    return (
      <div>
        <div className="description">
          <p className="sub_header__desc">
            simple snap app with <span>react</span>.
          </p>
        </div>
        <NewSnapForm session={this.props.session} />
        <JoinUs />
        <SnapList session={this.props.session} />
      </div>
    );
  }
}

export default Home;
