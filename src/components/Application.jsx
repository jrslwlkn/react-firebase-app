import React, { Component } from 'react';
import { auth, createUserProfileDoc } from '../firebase';

import Posts from './Posts';
import Auth from './Auth';

class Application extends Component {
  state = {
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
    const { user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Auth user={user} />
        <Posts />
      </main>
    );
  }
}

export default Application;
