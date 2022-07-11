import React, { useState } from "react";

import Tweet from "../components/tweets/Tweet";
import useTweets from "../hooks/useTweets";
import TweetForm from "../components/tweets/TweetForm";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const tweets = useTweets();
  return (
    <div className="home_container">
      <Link to="/profile">
        <span className="link">{user.displayName} &rarr;</span>
      </Link>
      <TweetForm user={user} />
      <div className="tweet_container">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userId={user.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
