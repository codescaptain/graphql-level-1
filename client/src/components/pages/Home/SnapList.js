import React from "react";
import { Query } from "react-apollo";
import { GET_SNAPS } from "../../../queries/index";

import { Snap } from "./Snap";

const SnapList = () => {
  return (
    <div>
      <Query query={GET_SNAPS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading Snaps...</div>;
          return (
            <div>
              <ul className="snaps">
                {data.snaps.map((snap) => (
                  <Snap key={snap._id} snap={snap} />
                ))}
              </ul>
              <div className="counter">{data.snaps.length} snap(s)</div>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default SnapList;
