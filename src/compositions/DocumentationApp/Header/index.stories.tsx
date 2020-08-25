import React from "react";
import Header from ".";

export default {
  title: "Header",
  component: Header,
};

export const simpleExample: React.FC = () => <Header hideMenu={() => null} />;
