const StrategyOpenApi3 = endpoints => {
  const output = [];
  const entries_path = Object.entries(endpoints.paths);
  for (let i = 0; i < entries_path.length; i++) {
    const [url, methods] = entries_path[i];
    const item = {};
    item.title = url;
    item.description = "";
    item["ID_SECTION"] = `${i + 1}_${url}`;
    item.fields = [];
    item.methods = Object.entries(methods).map(m => ({
      description: m[1].description,
      method: m[0],
      response: {},
      title: m[1].summary,
      ID_SECTION: m[1].operationId,
      url: url
    }));
    output.push(item);
  }

  return output;
};
const StrategyDefault = endpoints => {
  const output = [];
  for (let i = 0; i < endpoints.length; i++) {
    const element = endpoints[i];
    element["ID_SECTION"] = `${i + 1}_${element.endpoint}`;
    for (let j = 0; j < element.methods.length; j++) {
      const sub_element = element.methods[j];
      sub_element["ID_SECTION"] = `${i + 1}_${j + 1}_${element.endpoint}`;
    }
    output.push(element);
  }

  return output;
};

export const generateEndpoints = (data, specification) => {
  if (specification === "default") {
    data = StrategyDefault(data);
  } else if (specification === "oa3") {
    data = StrategyOpenApi3(data);
  }
  postMessage({ endpoint_message: true, endpoints: data });
};
