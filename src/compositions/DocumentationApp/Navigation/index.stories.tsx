import React from "react";
import Navigation from ".";
import generateData, { Endpoint } from "../../../generateData";
import data from "../../../data/endpoints.json";

export default {
  title: "Navigation",
  component: Navigation
};

export const simpleExample: React.FC = () => {
  const endpoints: Endpoint[] = generateData(data);
  return <Navigation endpoints={endpoints} />;
};
