import React, { useState } from "react";
import Axios from "axios";
import {
  BoxWrapper,
  Input,
  Submit,
  Text,
  TextButton,
} from "../Boxes/Boxes.styles";

const LoginSystem = ({ setDisplaying, setMessage }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (loginName.length >= 3) {
      if (password.length >= 7) {
        Axios.post("http://localhost:8001/login", {
          loginName: loginName,
          password: password,
        }).then((response) => {
          console.log(response);
          if (response.data.isAuthorized) {
            localStorage.setItem("token", response.data.token);
            setMessage({ error: false, text: "" });
          } else {
            setMessage({ error: true, text: response.data.message });
          }
        });
      } else {
        setMessage({
          error: true,
          text: "Password is too short, try 7 or more character one",
        });
      }
    } else {
      setMessage({
        error: true,
        text: "Username is too short, try 3 or more character one",
      });
    }
  };

  return (
    <BoxWrapper>
      <Input
        type="text"
        maxlength="20"
        placeholder="username"
        onChange={(e) => setLoginName(e.target.value)}
      />
      <Input
        type="password"
        maxlength="30"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Submit type="submit" value="Login" onClick={login} />
      <Text>Don't have account? </Text>
      <TextButton onClick={() => setDisplaying("Registration")}>
        Register
      </TextButton>
    </BoxWrapper>
  );
};

export default LoginSystem;
