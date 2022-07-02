import React, { useEffect, useState } from "react";
import { database } from "../fbase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { addDoc, onSnapshot } from "firebase/firestore";

const Home = ({ user }) => {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = (querySnapshot) => {
    const dbTweets = [];
    querySnapshot.forEach((document) => {
      const tweetInformation = document.data();
      const { id } = document;
      const tweetObject = { ...tweetInformation, id };
      dbTweets.push(tweetObject);
    });
    return dbTweets;
  };
  const loadTweets = async () => {
    const tweetCollection = collection(database, "tweets");
    const querySnapshot = await getDocs(tweetCollection);
    const dbTweets = getTweets(querySnapshot);
    setTweets(dbTweets);
  };
  const createDatabaseObserver = () => {
    const tweetCollection = collection(database, "tweets");
    const next = (querySnapshot) => {
      const dbTweets = getTweets(querySnapshot);
      setTweets(dbTweets);
    };
    onSnapshot(tweetCollection, { next });
  };
  useEffect(() => {
    loadTweets();
    createDatabaseObserver();
  }, []);
  const onTextChange = (event) => setText(event.target.value);
  const onTweetSubmit = async (event) => {
    event.preventDefault();
    if (text === "") {
      return;
    }
    const userId = user.uid;
    const tweetCollection = collection(database, "tweets");
    const tweetObject = {
      text,
      createdAt: Date.now(),
      creatorId: userId,
    };
    addDoc(tweetCollection, tweetObject);
    setText("");
  };
  const deleteTweet = async (tweetId) => {
    deleteDoc(doc(database, "tweets", tweetId));
  };
  return (
    <div>
      <form onSubmit={onTweetSubmit}>
        <input
          type="text"
          placeholder="Write anything you think."
          value={text}
          onChange={onTextChange}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <span>{tweet.text}</span>
            <span onClick={() => deleteTweet(tweet.id)}>❌</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
