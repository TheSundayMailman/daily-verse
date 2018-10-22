import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPOD } from '../actions/pod.js';

import '../styles/landing-page.css';

class LandingPage extends React.Component {
  submitEditorDate(editorDate) {
    this.props.dispatch(fetchPOD(editorDate))
    // below is how to redirect to another page without using <Redirect />
    .then(() => this.props.history.push('/explore'));
  }

  renderEditorsPicks() {
    const editorsPicks = require('../data/editors-picks.js');

    const picks = editorsPicks.map((each, index) => {
      return (
        <section className="editors-item" key={index}>
        <div className="item-container">
          <img src={require(`../assets/${each.date}.jpg`)} alt="Editor's Pick" />
          <h3>{each.title}</h3>
          <p>{each.caption}</p>
          <button onClick={() => this.submitEditorDate(each.date)}>Go</button>
        </div>
      </section>
      );
    });

    return (
      <article className="editors-row editors-picks">
        <section className="full-col">
          <h2>EDITOR'S PICKS</h2>
          <p>Need some help getting started? Want some suggestions for cool wallpapers?</p>
          <p><span id="logo">DailyVerse</span>'s got you covered. Here are some favorites in recent memory.</p>
        </section>
        {picks}
      </article>
    );
  }

  render() {
    return (
      <React.Fragment>

      <nav className="nav-bar">
        <h1 id="logo">DailyVerse</h1>
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
        {/* Intro */}
        <article className="flex-row intro">
          <section className="full-col">
            <h1>Welcome to <span id="logo">DailyVerse</span>!</h1>
            <p>Your one-stop-shop to explore NASA's Astronomy Picture of the Day, a daily publication of cosmic factoids for the last two decades!</p>
          </section>
        </article>
        {/* About */}
        <article className="flex-row about">
          <section className="full-col">
            <h2>ABOUT</h2>
            <p>Our universe is full of wonders. It might be overwhelming to see it all. Enter our friendly neighborhood scientists over at NASA.</p>
            <img id="nasa-logo" src={require('../assets/nasa-logo.png')} alt="NASA's logo" />
            <p>Over the last 20 years, these brilliant folks have been publishing a photo of the cosmos (almost) everyday. Each photo or video also contain a brief tidbit of what we are gazing into. Makes the learning easy!</p>
            <p>The collection is ever expanding, just like our universe.</p>
          </section>
          <section className="half-col">
            <p><span id="logo">DailyVerse</span> is powered by NASA's Astronomy Picture of the Day (aka APOD) API, which can access the entire APOD collection between 1995 and today.</p>
            <p>Simply pick a day, hit the button, sit back, and enjoy the publication for that date. Or if you are feeling adventurous, hit the "Random" button to jump to a random date.</p>
            <p>Links to HD images and videos are always provided. So this is also a great place to get some awesome desktop wallpaper.</p>
          </section>
          <section className="half-col">
            <p>The entry was published on June 16, 1995. It was a tiny image called "Neutron Star Earth".</p>
            <img src={require('../assets/1995-06-16.gif')} alt="First ever published content." />
            <p>Our technology has come a long way since then. Some of the images you encounter are so huge, it might take a second to load. There has been video content as well!</p>
          </section>
        </article>
        {/* Devices, aka The Experience */}
        <article className="flex-row devices">
          <section className="full-col">
            <h2>EXPERIENCE</h2>
          </section>
          <section className="left-col">
            <img id="preview" src={require('../assets/combined.png')} alt="Desktop and mobile preview." />
          </section>
          <section className="right-col">
            <p><span id="logo">DailyVerse</span> is viewable on all devices.</p>
            <p>Note: This site supports mobile and tablet devices by blocking autoplay videos and using lower resolution image backgrounds as to conserve user's bandwith.</p>
            <p>For optimal viewing experience, please visit <span id="logo">DailyVerse</span> on a desktop browser and in full-screen mode.</p>
            <p><b>Explore the universe in its full glory.</b></p>
          </section>
        </article>
        {/* Editor's Picks */}
        {this.renderEditorsPicks()}
        {/* Call to Action */}
        <article className="flex-row action">
          <section className="full-col">
            <h1>Stay awhile. Relax.</h1>
            <Link to="/explore">Wonder</Link>
          </section>
        </article>
      </main>

      <footer className="flex-row footer">
        <section className="third-col">
          <p>Content Info</p>
        </section>
        <section className="third-col">
          <p>Content Info</p>
        </section>
        <section className="third-col">
          <p>Content Info</p>
        </section>
      </footer>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    date: state.currentPOD.date,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(LandingPage);
