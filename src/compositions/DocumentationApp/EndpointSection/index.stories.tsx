import React from "react";
import EndpointSection from ".";

export default {
  title: "Endpoint Section",
  component: EndpointSection
};

export const simpleExample: React.FC = () => (
  <EndpointSection
    title="Food"
    description="Hey food description lorem"
    ID_SECTION="X"
  />
);
