import React, { useContext } from 'react';
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../providers/PostsProvider';
import { UserContext } from '../providers/UserProvider';

const Posts = () => {
  const posts = useContext(PostsContext);
  const user = useContext(UserContext);

  return (
    <section className="Posts">
      {user?.uid && <AddPost />}
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;
