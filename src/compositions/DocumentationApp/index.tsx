import React, { useContext, useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import EndpointSection from "./EndpointSection";
import { Endpoint } from "../../types";
import { SearchContext } from "../../providers/SearchProvider";
import { ConfigurationContext } from "../../providers/ConfigurationProvider";

interface Props {
  data: Endpoint[];
}

/* This component will assemble
   Footer, Header, EndpointSection
*/
const DocumentationApp: React.FC<Props> = ({ data }) => {
  const {
    state: { section_id_active },
  } = useContext(SearchContext);
  const refContent = useRef<HTMLDivElement | null>(null);
  const {
    state: { first_content },
  } = useContext(ConfigurationContext);
  const [menu, setMenu] = useState<boolean>(true);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const endpoint: Endpoint | undefined = data.find(
    (n) => n.ID_SECTION === section_id_active
  );
  useEffect(() => {
    if (refContent?.current) {
      refContent.current.scrollTop = 0;
    }
  }, [section_id_active]);
  return (
    <div>
      <Header {...{ data }} hideMenu={toggleMenu} />
      <div style={{ display: "flex", height: `calc(100vh - 145px)` }}>
        {menu ? <Navigation endpoints={data} /> : null}
        {endpoint ? (
          <EndpointSection
            ref={refContent}
            title={endpoint.title}
            description={endpoint.description}
            schema={endpoint.fields}
            methods={endpoint.methods}
            ID_SECTION={endpoint.ID_SECTION}
          />
        ) : (
          <EndpointSection
            ref={refContent}
            title={first_content.title}
            description={first_content.description}
            ID_SECTION="Initial"
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DocumentationApp;
