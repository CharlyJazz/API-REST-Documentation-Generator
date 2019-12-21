import React from "react";
import DocumentationApp from ".";
import data from "../../generateData";
import { SearchProvider } from "../../providers/SearchProvider";

export default {
  title: "Documentation App",
  component: DocumentationApp,
  decorators: [
    storyFn => <SearchProvider>{storyFn()}</SearchProvider>
  ]
};

export const simpleExample: React.FC = () => <DocumentationApp data={data} />;
