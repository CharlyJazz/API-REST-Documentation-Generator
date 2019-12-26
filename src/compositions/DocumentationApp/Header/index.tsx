import React, { useRef, useContext } from "react";
import Results from "../../../ui/Results";
import "./styles.scss";
import { SearchContext } from "../../../providers/SearchProvider";
import { Endpoint } from "../../../generateData";

// This component will be use the the logo
// setted in the provider, the colors and brand name
const Header: React.FC<{ data?: Endpoint[] }> = ({data}) => {
  let timeout: any = null;

  const refInput: any = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(SearchContext);

  const handleInput = () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      dispatch({
        type: "SEARCH_TEXT",
        payload: { value: refInput.current.value }
      });
    }, 500);
  };

  return (
    <header className="Header">
      <div>
        <img
          src="https://baller-documentation.firebaseapp.com/static/media/logo.46eb94ae.png"
          alt="logo"
        />
      </div>
      <div>
        <form>
          <input onKeyUp={handleInput} ref={refInput} />
          <div className="abs-results">
            <Results {...{data}}/>
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
  );
};

export default Header;
