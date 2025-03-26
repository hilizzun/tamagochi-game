import React from "react";
import "../styles/StatusBar.scss";

const StatusBar = ({ label, value }) => {
  return (
    <div className="status-bar">
      <span>{label}</span>
      <div className="bar">
        <div
          className="fill"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatusBar;