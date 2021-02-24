import React from "react";
import TimeAgo from "react-timeago";
export const Snap = ({ snap }) => {
  console.log({ snap });
  return (
    <li className={snap._id < 0 ? "optimistic" : ""}>
      <div className="title">
        <span className="username">@{snap.user.username} </span>
        {snap.text}
      </div>

      <div className="date">
        <span>
          {snap._id < 0 ? "sending..." : <TimeAgo date={snap.createdAt} />}
        </span>
      </div>
    </li>
  );
};
