import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  BoxWrapper,
  Input,
  Submit,
  Text,
  TextButton,
} from "../Boxes/Boxes.styles";
import authStyles from "./Authentication.module.css";

const RegistrationSystem = ({ setDisplaying, setMessage }) => {
  const [loginName, setLoginName] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:8001/login").then((response) => {
      if (response.data.loggedIn === true) {
        //todo
      }
    });
  }, []);

  const register = () => {
    if (loginName.length >= 3) {
      if (firstPassword.length >= 7) {
        if (firstPassword === secondPassword) {
          Axios.post("http://localhost:8001/register", {
            loginName: loginName,
            password: firstPassword,
          }).then((response) => {
            console.log(response);
            if (!response.data.error) {
              setDisplaying("Login");
            }
            setMessage({
              error: response.data.error,
              text: response.data.message,
            });
          });
        } else {
          setMessage({ error: true, text: "Passwords do not match" });
        }
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
        minlength="3"
        maxlength="20"
        placeholder="username"
        onChange={(e) => setLoginName(e.target.value)}
      />
      <Input
        type="password"
        minlength="7"
        maxlength="30"
        placeholder="password"
        onChange={(e) => setFirstPassword(e.target.value)}
      />
      <Input
        type="password"
        minlength="7"
        maxlength="30"
        placeholder="password again"
        onChange={(e) => setSecondPassword(e.target.value)}
      />
      <Submit type="submit" value="Register" onClick={register} />
      <Text>Already have account? </Text>
      <TextButton onClick={() => setDisplaying("Login")}>Login</TextButton>
    </BoxWrapper>
  );
};

export default RegistrationSystem;

export const Message = ({ isError, text }) => {
  if (isError) {
    return <span className={authStyles.ErrorText}>{text}</span>;
  }
  return <span className={authStyles.SuccessText}>{text}</span>;
};

const authenticate = () => {
  Axios.get("http://localhost:8001/isAuthenticated", {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  }).then((response) => {
    // todo
  });
};
