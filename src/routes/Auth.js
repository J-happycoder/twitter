import React, { useState } from "react";
import EmailAuth from "../components/auth/EmailAuth";
import SocialAuth from "../components/auth/SocialAuth";

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="auth_container">
      {errorMessage !== "" ? <span className="error_message">{errorMessage}</span> : null}
      <EmailAuth setErrorMessage={setErrorMessage} />
      <SocialAuth setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default Auth;
