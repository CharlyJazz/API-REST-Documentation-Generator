import React, { useRef, useContext } from "react";
import Results from "../../../ui/Results";
import { SearchContext } from "../../../providers/SearchProvider";
import { Endpoint } from "../../../types";
import { ConfigurationContext } from "../../../providers/ConfigurationProvider";
import "./styles.scss";

// This component will be use the the logo
// setted in the provider, the colors and brand name
const Header: React.FC<{ data?: Endpoint[] }> = ({ data }) => {
  let timeout: any = null;

  const refInput: any = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(SearchContext);
  const {
    state: { header: { logo_url, enable } }
  } = useContext(ConfigurationContext);

  const handleInput = () => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      dispatch({
        type: "SEARCH_TEXT",
        payload: { value: refInput.current.value }
      });
    }, 500);
  };

  return enable ? (
    <header className="Header">
      <div>
        <img
          src={logo_url}
          alt="Rest Documentation Logo"
        />
      </div>
      <div>
        <form>
          <input onKeyUp={handleInput} ref={refInput} />
          <div className="abs-results">
            <Results {...{ data }} />
          </div>
        </form>
        <button>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
    </header>
  ) : null;
};

export default Header;
