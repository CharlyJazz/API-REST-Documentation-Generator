export const generateEndpoints = data => {
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    element["ID_SECTION"] = `${i + 1}_${element.endpoint}`;
    for (let j = 0; j < element.methods.length; j++) {
      const sub_element = element.methods[j];
      sub_element["ID_SECTION"] = `${i + 1}_${j + 1}_${element.endpoint}`;
    }
  }
  postMessage({ endpoint_message: true, endpoints: data });
};
