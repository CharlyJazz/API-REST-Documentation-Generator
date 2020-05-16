import React from "react";
import ReactDOM from "react-dom";
import App from "./compositions/Application";
import { ConfigurationProvider } from "./providers/ConfigurationProvider";
import { SearchProvider } from "./providers/SearchProvider";
import { UserProvider } from "./providers/UserProvider";
import { Config } from './types'
import "./index.scss";

const Render = (config: Config, endpoints: any) => {
  ReactDOM.render(
    <ConfigurationProvider config={config}>
      <SearchProvider>
        <UserProvider config={config}>
          <App endpoints={endpoints} specification={config.specification} />
        </UserProvider>
      </SearchProvider>
    </ConfigurationProvider>,
    document.getElementById("DOC_GEN_REACT")
  )
}

const Bootstrap = (
  config: Config
): void => {
  if (config.endpoint_url) {
    fetch(config.endpoint_url)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        Render(config, res)
      }).catch(() => {
        console.error('A error ocurred meanwhile fetch the api contract.')
      })
  } else {
    Render(config, config.endpoints)
  }
}


export default Bootstrap
