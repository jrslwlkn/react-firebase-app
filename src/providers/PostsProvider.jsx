import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { getDocsStuff } from '../utils';

export const PostsContext = createContext();

export default class PostsProvider extends Component {
  state = {
    posts: []
  };

  firestoreUnsubscribe = null;

  componentDidMount() {
    this.firestoreUnsubscribe = firestore.collection('posts').onSnapshot(s => {
      const posts = s.docs.map(getDocsStuff);
      this.setState({ posts });
    });
  }

  componentWillUnmount() {
    this.firestoreUnsubscribe();
  }

  render() {
    const { posts } = this.state;
    const { children } = this.props;
    return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>;
  }
}
