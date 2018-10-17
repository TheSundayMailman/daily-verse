import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/landing-page.css';

export function LandingPage(props) {
  return (
    <React.Fragment>
    <nav className="nav-bar">
      <h1>Daily-Verse</h1>
      <Link to="/explore">Explore!</Link>
    </nav>
    <header className="attract">
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={require('../assets/timelapse.mp4')} type="video/mp4" />
        </video>
        <p>Explore</p>
      </div>
    </header>
    <main>
      <section className="about">
        <h1>Welcome to NASA's Astronomy Picture of the Day!</h1>
        <p>Our universe is full of wonders. It might be overwhelming to see it all.</p>
        <p>Ever since 1995, NASA has been publishing a photo (almost) daily. The collection is ever expanding, just like our universe.</p>
      </section>
      <section className="how-to">
        <h1>How it works</h1>
        <p>This app is powered by NASA's Astronomy Picture of the Day API.</p>
        <p>Daily-verse makes exploration the universe easy. Just pick a day, hit the button, sit back, and enjoy the publication for that date. Or if you are feeling adventurous, hit the "Random" button to jump to a random date.</p></section>
      <section className="action">
      <p>Stay awhile. Relax. Wonder.</p>
      <Link to="/explore">Explore.</Link>
      <p>Note: Daily-Verse supports mobile view by blocking autoplay videos and using lower resolution photos as to conserve user's bandwith. For optimal viewing experience, please visit Daily-Verse on a desktop browser. Explore the universe in its full glory.</p>
      <p>Links to HD images and videos are always provided.</p>
      </section>
    </main>
    <footer>
      <p>About</p>
    </footer>
    </React.Fragment>
  );
}

export default LandingPage;
