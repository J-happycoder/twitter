import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Tweet from "../components/tweets/Tweet";
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
      <div className="buttons">
        <Link to="/">
          <span className="link">&larr;</span>
        </Link>
        <span className="link" onClick={logOut}>
          Log Out &rarr;
        </span>
      </div>
      <div className="tweet_container">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userId={user.uid} />
        ))}
      </div>
    </>
  );
};

export default Profile;
