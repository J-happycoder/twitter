import React, { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { database, storage } from "../../fbase";

import { v4 as uuid } from "uuid";

const TweetForm = ({ user }) => {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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
    setIsUploading(true);
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
    setIsUploading(false);
    setText("");
    setImageFile();
    setImagePreviewUrl("");
  };

  return (
    <form className="tweet_form" onSubmit={onTweetSubmit}>
      <div className="container">
        {imagePreviewUrl !== "" ? (
          <img className="photo" src={imagePreviewUrl} alt="" />
        ) : (
          <div className="photo"></div>
        )}
        <label className="photo_selector" htmlFor="photo">
          Change
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="file_input"
        />
      </div>
      <div className="container">
        <input
          className="tweet_input"
          type="text"
          placeholder="What's on your mind?"
          value={text}
          onChange={onTextChange}
        />
        <input
          className="tweet_submit_button"
          type="submit"
          value={isUploading ? "Tweeting..." : "Tweet"}
        />
      </div>
    </form>
  );
};

export default TweetForm;
