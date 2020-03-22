import React, { Component } from 'react';

import Post from './Post';
import Comments from './Comments';

import { getDocsStuff } from '../utils';
import { firestore } from '../firebase';

export default class PostPage extends Component {
  state = {
    post: null,
    comments: []
  };

  render() {
    return <div>Post Page</div>;
  }
}
