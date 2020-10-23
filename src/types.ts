export type SchemaType = {
  field: string;
  rules: {};
};

export interface MethodProps {
  description?: string;
  method: string;
  response?: [];
  title: string;
  url: string;
  note?: string;
  request?: {};
  ID_SECTION: string;
}

export interface Endpoint {
  title?: string;
  description?: string;
  ID_SECTION: string;
  methods?: MethodProps[];
  fields?: SchemaType[];
}

export interface Action {
  type: string;
  payload: any;
}

export interface Config {
  loginStrategy?: (email: string, password: string) => any;
  logoutStrategy?: () => void;
  getUserStrategy?: () => any;
  with_login: boolean;
  url_base: string;
  endpoint_url: string;
  endpoints?: any;
  footer: {
    enable: boolean;
    text: string;
  };
  header: {
    enable: boolean;
    logo_url: string;
  };
  first_content: {
    title: string;
    description: string;
  };
}
