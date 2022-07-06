import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../fbase";

const useTweets = (ownerId) => {
  const [tweets, setTweets] = useState([]);
  const loadTweets = async () => {
    const tweetCollection = collection(database, "tweets");
    let tweetDocuments;
    if (ownerId) {
      const ownerIdFilter = query(tweetCollection, where("creatorId", "==", ownerId));
      tweetDocuments = await getDocs(ownerIdFilter);
    } else {
      tweetDocuments = await getDocs(tweetCollection);
    }
    const dbTweets = extractData(tweetDocuments);
    setTweets(dbTweets);
  };
  const extractData = (documents) => {
    const data = [];
    documents.forEach((document) => {
      const documentData = document.data();
      const { id } = document;
      const dataObject = { ...documentData, id };
      data.push(dataObject);
    });
    return data;
  };
  const createDatabaseObserver = () => {
    const tweetCollection = collection(database, "tweets");
    onSnapshot(tweetCollection, { next: loadTweets });
  };
  useEffect(() => {
    loadTweets();
    createDatabaseObserver();
  }, []);
  return tweets;
};

export default useTweets;
