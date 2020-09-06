import { SpecificationsAllowed } from "../types";

const loginStrategy = (email: string, password: string) => {
  return fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if ("error" in res) {
        return false;
      } else {
        const expirationDate: string = String(
          new Date(new Date().getTime() + res.expiresIn * 1000)
        );
        localStorage.setItem("token", res.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.localId);
        localStorage.setItem("email", res.email);
        return res;
      }
    })
    .catch((err) => {
      return false;
    });
};

const logoutStrategy = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
};

const getUserStrategy = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const expirationDate = localStorage.getItem("expirationDate");

  if (token && expirationDate && userId && email) {
    const expirationDateAsDate = new Date(expirationDate);

    if (expirationDateAsDate <= new Date()) {
      return { user_expired: true };
    } else {
      return {
        email: email,
      };
    }
  } else {
    return { not_user: true };
  }
};

const with_login = false;

const url_base = "https://yourfreshapi.com";

const endpoint_url = "http://localhost:3000/data/api.json";

const specification: SpecificationsAllowed = "oa3";

const footer = {
  enable: true,
  text: "Made with ❤",
};

const header = {
  enable: true,
  logo_url: "https://bpreferee.com/static/logo.png",
};

export default {
  loginStrategy,
  logoutStrategy,
  getUserStrategy,
  with_login,
  url_base,
  endpoint_url,
  specification,
  footer,
  header,
  first_content: {
    title: "Welcome!",
    description: "You can navigate and search endpoints.",
  },
};
