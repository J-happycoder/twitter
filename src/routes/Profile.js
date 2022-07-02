import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../fbase";

const Profile = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };
  return (
    <>
      <button onClick={logOut}>Log Out</button>
    </>
  );
};

export default Profile;
