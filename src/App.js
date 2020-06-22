import React, { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import MainForm from "./containers/MainForm/MainForm";

const App = (props) => {
  const [progress, setProgress] = useState(0);

  const onProgressChange = (passedProgress) => {
    setProgress(passedProgress);
  };

  return (
    <div className="App">
      <Header progress={progress} />
      <MainForm findProgress={(el) => onProgressChange(el)} />
    </div>
  );
};

export default App;
