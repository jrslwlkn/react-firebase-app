import React from 'react';
import { firestore, auth } from '../firebase';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = props => {
  console.log(props);
  const { id, title, content, user, createdAt, stars, comments } = props;
  const { currentUser } = auth;

  const postRef = firestore.doc(`posts/${id}`);

  const remove = () => postRef.delete();

  const star = () => postRef.update({ stars: stars + 1 });

  return (
    <article className="Post">
      <div className="Post--content">
        <Link to={`posts/${id}`}>
          <h3>{title}</h3>
        </Link>
        <div>{content}</div>
      </div>
      <div className="Post--meta">
        <div>
          <p>
            <span role="img" aria-label="star">
              ⭐️
            </span>
            {stars}
          </p>
          <p>
            <span role="img" aria-label="comments">
              🙊
            </span>
            {comments}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(createdAt.toDate()).calendar()}</p>
        </div>
        {currentUser?.uid && (
          <div className="Buttons">
            <button className="star" onClick={star}>
              Star
            </button>
            {currentUser.uid === user.uid && (
              <button className="delete" onClick={remove}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default Post;
