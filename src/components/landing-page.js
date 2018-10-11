import React from 'react';
import { Link } from 'react-router-dom';

export function LandingPage(props) {
  return (
    <main>
      <h1>Welcome to NASA's Astronomy Picture of the Day!</h1>
      <Link to="/explore">Explore!</Link>
    </main>
  );
}

export default LandingPage;
