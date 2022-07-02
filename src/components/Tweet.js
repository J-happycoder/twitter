import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { database, storage } from "../fbase";

const Tweet = ({ tweet, userId }) => {
  const deleteTweet = async (tweet) => {
    await deleteDoc(doc(database, "tweets", tweet.id));
    const photoRef = ref(storage, tweet.photoRefPath);
    await deleteObject(photoRef);
  };
  return (
    <div>
      {tweet.photoURL !== "" && <img src={tweet.photoURL} width="50px" height="50px" />}
      <span>{tweet.text}</span>
      {tweet.creatorId === userId ? (
        <span onClick={async () => await deleteTweet(tweet)}>❌</span>
      ) : null}
    </div>
  );
};

export default Tweet;
