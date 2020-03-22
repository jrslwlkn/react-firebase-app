import React from 'react';
import moment from 'moment';

import { signOut } from '../firebase';

const UserProfile = ({ displayName, photoURL, email, createdAt, children }) => {
  return (
    <section className="UserProfile">
      <div className="UserProfile--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
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

export default UserProfile;
