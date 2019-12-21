import React from "react";
import Navigation from ".";
import data from "../../../generateData";

export default {
  title: "Navigation",
  component: Navigation
};

export const simpleExample: React.FC = () => <Navigation endpoints={data}/>;
