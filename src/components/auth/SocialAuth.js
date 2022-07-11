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
      <button className="social_button" onClick={onGoogleClick}>
        <i className="fa-brands fa-google social_icon" />
      </button>
      <button className="social_button" onClick={onGithubClick}>
        <i className="fa-brands fa-github social_icon" />
      </button>
    </div>
  );
};

export default SocialAuth;
