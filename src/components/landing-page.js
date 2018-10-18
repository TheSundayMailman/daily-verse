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
        <div className="row">
          <section className="about col-12 box">
            <h1>Welcome to <span id="logo">Daily-Verse</span>!</h1>
            <p>Our universe is full of wonders. It might be overwhelming to see it all. Enter our friendly neighborhood scientists over at NASA.</p>
            <img id="nasa-logo" src={require('../assets/nasa-logo-web-rgb.png')} alt="NASA's logo" />
            <p>Since 1995, these brilliant folks have been publishing a photo of the cosmos (almost) everyday. Each photo or video also contain a brief tidbit of what we are gazing into. Makes the learning easy!</p>
            <p>The collection is ever expanding, just like our universe.</p>
          </section>
        </div>
        <div className="row">
          <section className="how-to col-12 box">
            <h1>How it works</h1>
            <p><span id="logo">Daily-Verse</span> is powered by NASA's Astronomy Picture of the Day (aka APOD) API, which makes the entire APOD collection between 1995 and today accessible.</p>
            <p>Simply pick a day, hit the button, sit back, and enjoy the publication for that date. Or if you are feeling adventurous, hit the "Random" button to jump to a random date.</p>
            <p>Note: <span id="logo">Daily-Verse</span> supports mobile and tablet devices by blocking autoplay videos and using lower resolution image backgrounds as to conserve user's bandwith. For optimal viewing experience, please visit The Daily-Verse on a desktop browser. Explore the universe in its full glory.</p>
            <p>Links to HD images and videos are always provided.</p>
          </section>
        </div>
        <div className="row">
          <section className="editors-picks col-12 box">
            <h1>Editor's Picks</h1>
            <p>(section under construction)</p>
          </section>
        </div>
        <div className="row">
          <section className="action">
            <h1>Stay awhile. Relax. Wonder.</h1>
            <Link to="/explore">Explore.</Link>
          </section>
        </div>
      </main>
      <footer>
        <div className="row">
          <p>Content Info</p>
        </div>
      </footer>
      </React.Fragment>
    );
  }
}

export default LandingPage;
