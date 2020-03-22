import React, { Component } from 'react';
import { firestore } from '../firebase';

import Posts from './Posts';
import { getDocsStuff } from '../utils';
import Auth from './Auth';

class Application extends Component {
  state = {
    posts: [],
    user: null
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

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Auth user={user} />
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
