import React, { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../fbase";

import "../style/styles.css";

const App = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsInitialized(true);
    });
  }, []);
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
      />
      {isInitialized && <Router user={user} />}
    </>
  );
};

export default App;
