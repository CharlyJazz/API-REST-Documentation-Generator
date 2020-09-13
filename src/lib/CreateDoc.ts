import { Config } from "../types";
import Render from "./Render";

/**
 * Function to fetch api contract
 * or/and render ui or catch error
 * @param config have all configutation to create the documentation
 */
const CreateDoc = (config: Config): any => {
  if (config.endpoint_url) {
    fetch(config.endpoint_url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        Render(config, res);
      })
      .catch(() => {
        console.error("A error ocurred meanwhile fetch the api contract.");
      });
  } else {
    Render(config, config.endpoints);
  }
};

export default CreateDoc;
