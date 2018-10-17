import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/landing-page.css';

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
      <nav className="nav-bar">
        <h1 id="logo">Daily-Verse</h1>
        <Link to="/explore">Explore</Link>
      </nav>
      <header>
        <div className="attract-video-container">
          <video id="attract-video" autoPlay muted loop>
            <source src={require('../assets/timelapse.mp4')} type="video/mp4" />
          </video>
          <section className="attract-text-container">
            <h1 id="attract-text">Explore the universe, one day at a time.</h1>
            <Link id="attract-link" to="/explore">Right Here.</Link>
          </section>
        </div>
      </header>
      <main className="landing-page">
        <section className="about">
          <h1>Welcome to <span id="logo">Daily-Verse</span>!</h1>
          <p>Our universe is full of wonders. It might be overwhelming to see it all.</p>
          <p>Fortunately, our friendly neighborhood scientists over at NASA have been publishing a photo of the great beyond (almost) everyday since 1995. Each photo or video also contain a brief tidbit of what we are gazing into. Makes the learning easy!</p>
          <p>The collection is ever expanding, just like our universe.</p>
        </section>
        <section className="how-to">
          <h1>How it works</h1>
          <p><span id="logo">Daily-Verse</span> is powered by NASA's Astronomy Picture of the Day (aka APOD) API, which makes the entire APOD collection between 1995 and today accessible.</p>
          <p>Simply pick a day, hit the button, sit back, and enjoy the publication for that date. Or if you are feeling adventurous, hit the "Random" button to jump to a random date.</p>
          <p>Note: <span id="logo">Daily-Verse</span> supports mobile and tablet devices by blocking autoplay videos and using lower resolution image backgrounds as to conserve user's bandwith. For optimal viewing experience, please visit The Daily-Verse on a desktop browser. Explore the universe in its full glory.</p>
          <p>Links to HD images and videos are always provided.</p>
        </section>
        <section className="editors-picks">
          <h1>Editor's Picks</h1>
          <p>(section under construction)</p>
        </section>
        <section className="action">
          <h1>Stay awhile. Relax. Wonder.</h1>
          <Link to="/explore">Explore.</Link>
        </section>
      </main>
      <footer>
        <p>Content Info</p>
      </footer>
      </React.Fragment>
    );
  }
}

export default LandingPage;
