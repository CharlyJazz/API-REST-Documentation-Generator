import React from "react";
import Navigation from ".";
import { Endpoint } from "../../../types";
import data from "../../../data/endpoints.json";
import generateData from "../../../mocks/generateData";

export default {
  title: "Navigation",
  component: Navigation
};

export const simpleExample: React.FC = () => {
  const endpoints: Endpoint[] = generateData(data);
  return <Navigation endpoints={endpoints} />;
};
