import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Posts from './Posts';
import Auth from './Auth';
import UserProfile from './UserProfile';
import PostPage from './PostPage';

export default function Application() {
  return (
    <main className="Application">
      <Link to="/">
        <h1>Think Piece</h1>
      </Link>
      <Auth />
      <Switch>
        <Route exact path="/" component={Posts}></Route>
        <Route exact path="/profile" component={UserProfile}></Route>
        <Route exact path="/posts/:id" component={PostPage}></Route>
      </Switch>
    </main>
  );
}
