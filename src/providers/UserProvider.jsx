import React, { Component, createContext } from 'react';
import { auth, createUserProfileDoc } from '../firebase';

export const UserContext = createContext();

export default class UserProvider extends Component {
  state = {
    user: null
  };

  authUnsubscribe = null;

  componentDidMount() {
    this.authUnsubscribe = auth.onAuthStateChanged(async u => {
      if (u) {
        const userRef = await createUserProfileDoc(u);
        userRef.onSnapshot(snapshot => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
        });
      }
      this.setState({ user: u });
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}
