import React from "react";
import Navigation from ".";
import { Endpoint } from "../../../types";
import CreateDoc from "../../../lib/CreateDoc";
import config from "../../../config";

export default {
  title: "Navigation",
  component: Navigation
};

export const simpleExample: React.FC = () => {
  const endpoints: Endpoint[] = CreateDoc(config);
  return <Navigation endpoints={endpoints} />;
};
