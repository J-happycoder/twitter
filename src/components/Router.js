import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const Router = ({ user }) => {
  return (
    <HashRouter>
      <Routes>
        {user ? (
          <>
            <Route exact path="/" element={<Home user={user} />} />
            <Route exact path="/profile" element={<Profile user={user} />} />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default Router;
