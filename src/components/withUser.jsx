import React from 'react';
import { UserContext } from '../providers/UserProvider';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.getDisplayName || WrappedComponent.name || 'Component';
};

export default function withUser(Component) {
  const WrappedComponent = props => {
    return <UserContext.Consumer>{user => <Component user={user} {...props} />}</UserContext.Consumer>;
  };

  WrappedComponent.displayName = `withUser(${getDisplayName(WrappedComponent)})`;

  return WrappedComponent;
}
