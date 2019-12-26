import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../providers/SearchProvider";
import { Endpoint } from "../../generateData";
import Text, { DESCRIPTION_ENDPOINT } from "../Text";
import "./styles.scss";

const isAMatch = (string: string, value: string): boolean =>
  string.toLocaleLowerCase().indexOf(value) > -1;

// Results of the search bar
const Results: React.FC<{ data?: Endpoint[] }> = ({ data }) => {
  const [results, setResults] = useState<Endpoint[]>([]);
  const {
    state: { text, section_id_active },
    dispatch
  } = useContext(SearchContext);

  useEffect(() => {
    if (data && text) {
      const lower_text: string = text.toLocaleLowerCase();
      const temp_array: Endpoint[] = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.title && isAMatch(element.title, lower_text)) {
          temp_array.push(element);
        }
      }
      setResults(temp_array);
    } else if (results.length) {
      setResults([]);
    }
  }, [text]);

  if (results.length) {
    return (
      <div className="Results">
        <ul tabIndex={0}>
          {results.map(item => (
            <li key={item.ID_SECTION}>
              <Text
                type={DESCRIPTION_ENDPOINT}
                onClick={() =>
                  dispatch({
                    type: "SET_ID_SECTION",
                    payload: { value: item.ID_SECTION }
                  })
                }
                {...(section_id_active === item.ID_SECTION
                  ? { style: { color: "#00BCD4" } }
                  : {})}
              >
                <span style={{ textTransform: "capitalize" }}>
                  {item.title}
                </span>
              </Text>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default Results;
