import React, { useContext } from 'react';

import { UserContext } from '../providers/UserProvider';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

export default function Auth() {
  const user = useContext(UserContext);

  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
}
