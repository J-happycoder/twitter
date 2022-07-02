import React, { useState } from "react";
import { auth } from "../fbase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const formatError = (error) => {
    const { code } = error;
    const errorMessage = code.slice(5, code.length).replaceAll("-", " ");
    return errorMessage;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email === "" || auth === "") {
      return;
    }
    try {
      if (isNewAccount) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      const errorMessage = formatError(error);
      setErrorMessage(errorMessage);
    }
  };

  const cleanForm = () => {
    setEmail("");
    setPassword("");
  };

  const changeIsNewAccount = () => {
    cleanForm();
    setIsNewAccount((previous) => !previous);
  };

  const onGoogleClick = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const errorMessage = formatError(error);
      setErrorMessage(errorMessage);
    }
  };

  const onGithubClick = async () => {
    try {
      const githubProvider = new GithubAuthProvider();
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      const errorMessage = formatError(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {errorMessage !== "" ? <span>{errorMessage}</span> : null}
        <input type="text" placeholder="Email" value={email} onChange={onEmailChange} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <input type="submit" value={isNewAccount ? "Create Account" : "Log In"} />
      </form>
      <span onClick={changeIsNewAccount}>{isNewAccount ? "Log In" : "Create Account"}</span>
      <div>
        <button onClick={onGoogleClick}>Continue with Google</button>
        <button onClick={onGithubClick}>Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
