import React from "react";

import "./Header.css";
import ProgressCircle from "../../containers/Header/ProgressCircle/ProgressCircle";

const Header = (props) => {
  return (
    <div className="Header_root">
      <ProgressCircle progress={props.progress} />
      <div className="Header">
        <div>New York State</div>
        <h1>Request for Contact</h1>
      </div>
    </div>
  );
};

export default Header;
