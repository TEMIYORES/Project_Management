import React from "react";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

const HomeScreen = () => {
  return (
    <div className="container">
      <Clients />
      <Projects />
    </div>
  );
};

export default HomeScreen;
