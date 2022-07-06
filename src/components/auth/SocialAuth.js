import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../../fbase";

const SocialAuth = ({ setErrorMessage }) => {
  const formatFirebaseError = (error) => {
    const { code } = error;
    const errorMessage = code.slice(5, code.length).replaceAll("-", " ");
    return errorMessage;
  };

  const onGoogleClick = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const errorMessage = formatFirebaseError(error);
      setErrorMessage(errorMessage);
    }
  };

  const onGithubClick = async () => {
    try {
      const githubProvider = new GithubAuthProvider();
      await signInWithPopup(auth, githubProvider);
    } catch (error) {
      const errorMessage = formatFirebaseError(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div>
      <button onClick={onGoogleClick}>Continue with Google</button>
      <button onClick={onGithubClick}>Continue with Github</button>
    </div>
  );
};

export default SocialAuth;
