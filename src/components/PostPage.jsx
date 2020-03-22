import React, { Component } from 'react';

import Post from './Post';
import Comments from './Comments';

import { getDocsStuff } from '../utils';
import { firestore } from '../firebase';
import { withRouter } from 'react-router-dom';
import withUser from './withUser';

class PostPage extends Component {
  state = {
    post: null,
    comments: []
  };

  get postID() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`posts/${this.postID}`);
  }

  get commentsRef() {
    return this.postRef.collection('comments');
  }

  postUnsubscribe = null;
  commentsUnsubscribe = null;

  componentDidMount = async () => {
    this.postUnsubscribe = this.postRef.onSnapshot(snapshot => {
      const post = getDocsStuff(snapshot);
      this.setState({ post });
    });

    this.commentsUnsubscribe = this.commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(getDocsStuff);
      this.setState({ comments });
    });
  };

  componentWillUnmount() {
    this.postUnsubscribe();
    this.commentsUnsubscribe();
  }

  createComment = comment => {
    const { user } = this.props;
    this.commentsRef.add({ ...comment, user });
  };

  render() {
    const { post, comments } = this.state;

    return (
      <section>
        {post && (
          <>
            <Post {...post} />
            <Comments comments={comments} postID={post.id} onCreate={this.createComment} />
          </>
        )}
      </section>
    );
  }
}

export default withRouter(withUser(PostPage));
