import React from 'react';

import Posts from './Posts';
import Auth from './Auth';

export default function Application() {
  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Auth />
      <Posts />
    </main>
  );
}
