import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import Tweet from "../components/Tweet";
import useTweets from "../hooks/useTweets";
import { auth } from "../fbase";

const Profile = ({ user }) => {
  const tweets = useTweets(user.uid);
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };
  return (
    <>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userId={user.uid} />
        ))}
      </div>
      <button onClick={logOut}>Log Out</button>
    </>
  );
};

export default Profile;
