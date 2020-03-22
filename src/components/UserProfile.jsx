import React, { Component } from 'react';
import { auth, firestore } from '../firebase';

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

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { displayName } = this.state;

    if (displayName) {
      this.userRef.update({ displayName });
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
