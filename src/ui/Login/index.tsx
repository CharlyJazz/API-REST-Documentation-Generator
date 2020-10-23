import React, { useState, useContext } from "react";
import { ConfigurationContext } from "../../providers/ConfigurationProvider";
import { UserContext } from "../../providers/UserProvider";
import "./styles.scss";

const Login: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const { state } = useContext(ConfigurationContext);
  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const payload = await state.loginStrategy?.(email, password);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload
      });
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="Login">
      <form className="Login__form" onSubmit={handleSubmit}>
        <div className="Login__form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="hello@domain.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="Login__form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            placeholder="Secret_123"
            id="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button className="Login__form-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
