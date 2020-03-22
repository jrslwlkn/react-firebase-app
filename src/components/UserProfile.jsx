import React, { Component } from 'react';
import { auth, firestore, storage } from '../firebase';

export default class UserProfile extends Component {
  state = {
    displayName: ''
  };

  image = null;

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  get file() {
    return this.image && this.image.files[0];
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { displayName } = this.state;

    if (displayName) {
      this.userRef.update({ displayName });
      this.setState({ displayName: '' });
    }

    if (this.file) {
      storage
        .ref()
        .child('user-profiles')
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then(res => res.ref.getDownloadURL())
        .then(photoURL => this.userRef.update({ photoURL }));
    }
  };

  render() {
    const { displayName } = this.state;

    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
          />
          <input type="file" ref={r => (this.image = r)} />
          <input type="submit" className="update" />
        </form>
      </section>
    );
  }
}
