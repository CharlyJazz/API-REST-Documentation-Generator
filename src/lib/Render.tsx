import React from "react";
import ReactDOM from "react-dom";
import App from "../compositions/Application";
import { ConfigurationProvider } from "../providers/ConfigurationProvider";
import { SearchProvider } from "../providers/SearchProvider";
import { UserProvider } from "../providers/UserProvider";
import { Config } from "../types";
import "../index.scss";

const Render = (
  config: Config,
  endpoints: any,
  id: string = "DOC_GEN_REACT"
) => {
  ReactDOM.render(
    <ConfigurationProvider config={config}>
      <SearchProvider>
        <UserProvider config={config}>
          <App endpoints={endpoints} />
        </UserProvider>
      </SearchProvider>
    </ConfigurationProvider>,
    document.getElementById(id)
  );
};

export default Render;
