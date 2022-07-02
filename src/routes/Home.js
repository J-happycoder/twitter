import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";

import { database, storage } from "../fbase";
import { collection, getDocs } from "firebase/firestore";
import { addDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { v4 as uuid } from "uuid";

const Home = ({ user }) => {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const getTweets = (documents) => {
    const dbTweets = [];
    documents.forEach((document) => {
      const tweetInformation = document.data();
      const { id } = document;
      const tweetObject = { ...tweetInformation, id };
      dbTweets.push(tweetObject);
    });
    return dbTweets;
  };
  const loadTweets = async () => {
    const tweetCollection = collection(database, "tweets");
    const documents = await getDocs(tweetCollection);
    const dbTweets = getTweets(documents);
    setTweets(dbTweets);
  };
  const createDatabaseObserver = () => {
    const tweetCollection = collection(database, "tweets");
    const next = (documents) => {
      const dbTweets = getTweets(documents);
      setTweets(dbTweets);
    };
    onSnapshot(tweetCollection, { next });
  };

  useEffect(() => {
    loadTweets();
    createDatabaseObserver();
  }, []);

  const onTextChange = (event) => setText(event.target.value);

  const uploadTweet = async (tweet) => {
    const tweetCollection = collection(database, "tweets");
    await addDoc(tweetCollection, tweet);
  };

  const uploadPhoto = async (photoRef) => {
    await uploadBytes(photoRef, imageFile);
  };
  const getPhotoURL = async (photoRef) => {
    const photoURL = await getDownloadURL(photoRef);
    return photoURL;
  };
  const onTweetSubmit = async (event) => {
    event.preventDefault();
    if (text === "" || !imageFile) {
      return;
    }
    const photoRefPath = `photos/${uuid()}`;
    const photoRef = ref(storage, photoRefPath);
    await uploadPhoto(photoRef);
    const photoURL = await getPhotoURL(photoRef);
    const userId = user.uid;
    const tweet = {
      text,
      createdAt: Date.now(),
      creatorId: userId,
      photoURL,
      photoRefPath,
    };
    await uploadTweet(tweet);
    setText("");
    setImageFile();
    setImagePreviewUrl("");
  };

  const onFileChange = (event) => {
    const { files } = event.target;
    if (files.length === 0) {
      return;
    }
    const imageFile = files[0];
    const imagePreviewUrl = URL.createObjectURL(imageFile);
    setImageFile(imageFile);
    setImagePreviewUrl(imagePreviewUrl);
  };

  return (
    <div>
      <form onSubmit={onTweetSubmit}>
        {imagePreviewUrl !== "" && <img src={imagePreviewUrl} alt="" width="50px" height="50px" />}
        <input
          type="text"
          placeholder="Write anything you think."
          value={text}
          onChange={onTextChange}
        />
        <label htmlFor="photo">Select Photo</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            display: "none",
          }}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userId={user.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
