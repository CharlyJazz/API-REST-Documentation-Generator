const with_login = false;

const url_base = "https://domain.com/api/";

const endpoint_url =
  "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.json";

const footer = {
  enable: true,
  text: "Made with ❤",
};

const header = {
  enable: true,
  logo_url: "/logo192.png",
};

export default {
  with_login,
  url_base,
  endpoint_url,
  footer,
  header,
  first_content: {
    title: "Welcome!",
    description: "You can navigate and search endpoints.",
  },
};
