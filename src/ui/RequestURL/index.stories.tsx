import React from "react";
import RequestURL from ".";

export default {
  title: 'Request URL',
  component: RequestURL
};

export const withGetMethod: React.FC = () => (
  <RequestURL method="GET" url="https://storybook.js.org" />
);
