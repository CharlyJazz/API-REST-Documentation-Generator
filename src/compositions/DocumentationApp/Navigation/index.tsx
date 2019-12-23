import React, { useContext } from "react";
import VirtualList from "react-tiny-virtual-list";
import Text, {
  DESCRIPTION_METHOD_SECTION,
  DESCRIPTION_ENDPOINT
} from "../../../ui/Text";
import { Endpoint } from "../../../generateData";
import { SearchContext } from "../../../providers/SearchProvider";
import "./styles.scss";

interface Props {
  endpoints: Endpoint[];
}

// Side menu to render list of lists of methods of each endpoint
const Navigation: React.FC<Props> = ({endpoints}) => {
  const {
    dispatch,
    state: { section_id_active, sub_section_id_active }
  } = useContext(SearchContext);
  if (!endpoints || !Array.isArray(endpoints)) {
    return null;
  }
  return (
    <div className="Navigation">
      <ul>
        <VirtualList
          width="100%"
          height={window.innerHeight - 150}
          itemCount={endpoints.length}
          itemSize={index => {
            const item = endpoints[index];
            if (
              Array.isArray(item.methods) &&
              item.ID_SECTION === section_id_active
            ) {
              return 63 + item.methods.length * 55;
            }
            return 63;
          }} // Also supports variable heights (array or function getter)
          renderItem={({ index, style }) => {
            const item = endpoints[index];
            return (
              <div key={index} style={style}>
                <li key={item.ID_SECTION}>
                  <a
                    href={`#${item.ID_SECTION}`}
                    style={{ textDecoration: "none" }}
                  >
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
                  </a>
                  {Array.isArray(item.methods) &&
                    section_id_active === item.ID_SECTION && (
                      <ul>
                        {item.methods.map(subitem => {
                          return (
                            <li
                              key={subitem.ID_SECTION}
                              onClick={() =>
                                dispatch({
                                  type: "SET_ID_SUB_SECTION",
                                  payload: { value: subitem.ID_SECTION }
                                })
                              }
                            >
                              <a
                                href={`#${subitem.ID_SECTION}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Text
                                  type={DESCRIPTION_METHOD_SECTION}
                                  {...(sub_section_id_active ===
                                  subitem.ID_SECTION
                                    ? { style: { color: "#00BCD4" } }
                                    : {})}
                                >
                                  <span style={{ textTransform: "capitalize" }}>
                                    {subitem.title}
                                  </span>
                                </Text>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                </li>
              </div>
            );
          }}
        />
      </ul>
    </div>
  );
};

export default Navigation;
