import React from "react";
import DocumentationApp from ".";
import { SearchProvider } from "../../providers/SearchProvider";
import generateData from "../../generateData";
import data from "../../data/endpoints.json";

export default {
  title: "Documentation App",
  component: DocumentationApp,
  decorators: [storyFn => <SearchProvider>{storyFn()}</SearchProvider>]
};

export const simpleExample: React.FC = () => (
  <DocumentationApp data={generateData(data)} />
);
