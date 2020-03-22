import React from 'react';
import moment from 'moment';

import { signOut } from '../firebase';

const UserProfile = ({ displayName, photoURL, email, createdAt, children }) => {
  return (
    <section className="UserProfile">
      <div className="UserProfile--profile">
        <img src={photoURL} alt={displayName} />
        <div className="UserProfile--information">
          <h2>{displayName}</h2>
          <p className="email">{email}</p>
          <p className="created-at">{moment(createdAt).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

UserProfile.defaultProps = {
  displayName: 'John Doe',
  email: 'jdoe@mailinator.com',
  photoURL: 'https://www.fillmurray.com/300/300',
  createdAt: new Date()
};

export default UserProfile;
