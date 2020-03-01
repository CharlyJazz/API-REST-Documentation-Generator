import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import EndpointSection from "./EndpointSection";
import { Endpoint } from "../../generateData";
import { SearchContext } from "../../providers/SearchProvider";

interface Props {
  data: Endpoint[];
}

/* This component will assemble
   Footer, Header, EndpointSection
*/
const DocumentationApp: React.FC<Props> = ({ data }) => {
  const {
    state: { section_id_active }
  } = useContext(SearchContext);

  const renderEndpointSection = () => {
    if (section_id_active) {
      try {
        const findedEndpoint: Endpoint = data.filter(
          n => n.ID_SECTION === section_id_active
        )[0];

        return (
          <EndpointSection
            title={findedEndpoint.title}
            description={findedEndpoint.description}
            schema={findedEndpoint.fields}
            methods={findedEndpoint.methods}
            ID_SECTION={findedEndpoint.ID_SECTION}
          />
        );
      } catch (error) {
        return null;
      }
    }

    return (
      <EndpointSection
        title="Welcome!"
        description="You can navigate and search endpoints."
        ID_SECTION="Initial"
      />
    );
  };

  return (
    <div>
      <Header {...{ data }} />
      <div style={{ display: "flex" }}>
        <Navigation endpoints={data} />
        {renderEndpointSection()}
      </div>
      <Footer />
    </div>
  );
};

export default DocumentationApp;
