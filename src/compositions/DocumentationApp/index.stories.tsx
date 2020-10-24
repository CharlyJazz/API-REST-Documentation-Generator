import React from "react";
import DocumentationApp from ".";
import CreateDoc from "../../lib/CreateDoc";
import config from "../../config";
import { SearchProvider } from "../../providers/SearchProvider";

export default {
  title: "Documentation App",
  component: DocumentationApp,
  decorators: [(storyFn) => <SearchProvider>{storyFn()}</SearchProvider>],
};

export const simpleExample: React.FC = () => (
  <DocumentationApp data={CreateDoc(config)} />
);
