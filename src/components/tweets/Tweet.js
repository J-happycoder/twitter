import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { database, storage } from "../../fbase";

const Tweet = ({ tweet, userId }) => {
  const deleteTweet = async (tweet) => {
    await deleteDoc(doc(database, "tweets", tweet.id));
    const photoRef = ref(storage, tweet.photoRefPath);
    await deleteObject(photoRef);
  };
  return (
    <div className="tweet">
      <div className="tweet_information">
        <img className="photo" src={tweet.photoURL} width="50px" height="50px" />
        <span className="tweet_text">{tweet.text}</span>
      </div>
      {tweet.creatorId === userId ? (
        <span className="delete_button" onClick={async () => await deleteTweet(tweet)}>
          delete
        </span>
      ) : null}
    </div>
  );
};

export default Tweet;
