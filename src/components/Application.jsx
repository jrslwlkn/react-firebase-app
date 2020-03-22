import React, { Component } from 'react';
import { firestore } from '../firebase';

import Posts from './Posts';
import { getDocsStuff } from '../utils';

class Application extends Component {
  state = {
    posts: []
  };

  unsubscribe = null;

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection('posts').onSnapshot(s => {
      const posts = s.docs.map(getDocsStuff);
      this.setState({ posts });
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCreate = async post => {
    const { posts } = this.state;
    const docRef = await firestore.collection('posts').add(post);
    const doc = await docRef.get();
    const newPost = getDocsStuff(doc);
    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async id => {
    const posts = this.state.posts.filter(p => p.id !== id);
    await firestore.doc(`posts/${id}`).delete();
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
