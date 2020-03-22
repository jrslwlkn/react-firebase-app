import React from 'react';
import Post from './Post';
import AddPost from './AddPost';

const Posts = ({ posts, onCreate, onRemove }) => {
  return (
    <section className="Posts">
      <AddPost />
      {posts.map(post => (
        <Post {...post} key={post.id} onRemove={() => onRemove(post.id)} />
      ))}
    </section>
  );
};

export default Posts;
