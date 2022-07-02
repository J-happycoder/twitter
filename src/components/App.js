import React, { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../fbase";

const App = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsInitialized(true);
    });
  }, []);
  return <>{isInitialized ? <Router user={user} /> : <span>Loading...</span>}</>;
};

export default App;
