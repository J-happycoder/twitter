import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../fbase";

const EmailAuth = ({ setErrorMessage }) => {
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const formatFirebaseError = (error) => {
    const { code } = error;
    const errorMessage = code.slice(5, code.length).replaceAll("-", " ");
    return errorMessage;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Email or Password is Required");
      return;
    }
    try {
      if (isNewAccount) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      const errorMessage = formatFirebaseError(error);
      setErrorMessage(errorMessage);
    }
  };

  const changeIsNewAccount = () => {
    cleanForm();
    setIsNewAccount((previous) => !previous);
    setErrorMessage("");
  };
  const cleanForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form className="auth_form" onSubmit={onSubmit}>
        <input
          className="auth_input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          className="auth_input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <input
          className="submit_button auth_input"
          type="submit"
          value={isNewAccount ? "Create Account" : "Log In"}
        />
      </form>
      <span className="link auth_change_button" onClick={changeIsNewAccount}>
        {isNewAccount ? "Log In" : "Create Account"} &rarr;
      </span>
    </>
  );
};

export default EmailAuth;
