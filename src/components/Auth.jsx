import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

export default function Auth({ user, loading }) {
  if (loading) return null;
  return <div>{user ? <CurrentUser /> : <SignInAndSignUp />}</div>;
}
