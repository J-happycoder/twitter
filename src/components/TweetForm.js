import React, { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../fbase";

import { v4 as uuid } from "uuid";

const TweetForm = ({ user }) => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const onTextChange = (event) => setText(event.target.value);
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

  return (
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
  );
};

export default TweetForm;
