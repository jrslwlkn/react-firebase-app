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
      const user = await createUserProfileDoc(u);

      this.setState({ user });
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
