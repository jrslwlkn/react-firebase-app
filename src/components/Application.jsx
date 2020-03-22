import React, { Component } from 'react';
import { firestore, auth, createUserProfileDoc } from '../firebase';

import Posts from './Posts';
import { getDocsStuff } from '../utils';
import Auth from './Auth';

class Application extends Component {
  state = {
    posts: [],
    user: null
  };

  authUnsubscribe = null;

  componentDidMount = async () => {
    this.authUnsubscribe = auth.onAuthStateChanged(async u => {
      const user = await createUserProfileDoc(u);

      this.setState({ user });
    });
  };

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
