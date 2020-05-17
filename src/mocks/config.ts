import { SpecificationsAllowed } from "../types";

const loginStrategy = (email: string, password: string) => {
  return fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(res => {
      return res.json();
    })
    .then(res => {
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
    .catch(err => {
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
        email: email
      };
    }
  } else {
    return { not_user: true };
  }
};

const withLogin = !false;

const urlBase = 'https://yourfreshapi.com'

const endpoint_url = 'http://localhost:3000/data/openapi3.json'

const specification: SpecificationsAllowed = 'oa3'

const footer = {
  enable: true,
  text: 'asd My footer xdddd'
}

const header = {
  enable: true,
  logo_url: 'https://baller-documentation.firebaseapp.com/static/media/logo.46eb94ae.png'
}

export default {
  loginStrategy,
  logoutStrategy,
  getUserStrategy,
  withLogin,
  urlBase,
  endpoint_url,
  specification,
  footer,
  header
};
