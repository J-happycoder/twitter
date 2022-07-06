import React from "react";

import Tweet from "../components/Tweet";
import useTweets from "../hooks/useTweets";
import TweetForm from "../components/TweetForm";

const Home = ({ user }) => {
  const tweets = useTweets();
  return (
    <div>
      <TweetForm user={user} />
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userId={user.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
