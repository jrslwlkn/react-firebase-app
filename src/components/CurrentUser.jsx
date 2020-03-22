import React from 'react';
import moment from 'moment';

import { signOut } from '../firebase';
import { Link } from 'react-router-dom';

const UserProfile = ({ displayName, photoURL, email, createdAt, children }) => {
  return (
    <section className="UserProfile">
      <div className="UserProfile--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="UserProfile--information">
          <Link to="profile">
            <h2>{displayName}</h2>
          </Link>
          <p className="email">{email}</p>
          <p className="created-at">{moment(createdAt.toDate()).calendar()}</p>
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
