import React from "react";
import Table from ".";

export default {
  title: "Table of Attributes",
  component: Table
};

export const simpleExample: React.FC = () => (
  <Table
    header_cols={["Key", "Description", 'Date Type']}
    rows={[
      ["street", "A street to send the gift", "String"],
      ["to", "ID Of user", "Integer"],
    ]}
  />
);
