import React, { useState } from "react";
import EmailAuth from "../components/auth/EmailAuth";
import SocialAuth from "../components/auth/SocialAuth";

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div>
      {errorMessage !== "" ? <span>{errorMessage}</span> : null}
      <EmailAuth setErrorMessage={setErrorMessage} />
      <SocialAuth setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default Auth;
