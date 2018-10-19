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
        <div className="row">
          <section className="about col-12 box">
            <h1>Welcome to <span id="logo">DailyVerse</span>!</h1>
            <p>Our universe is full of wonders. It might be overwhelming to see it all. Enter our friendly neighborhood scientists over at NASA.</p>
            <img id="nasa-logo" src={require('../assets/nasa-logo-web-rgb.png')} alt="NASA's logo" />
            <p>Since 1995, these brilliant folks have been publishing a photo of the cosmos (almost) everyday. Each photo or video also contain a brief tidbit of what we are gazing into. Makes the learning easy!</p>
            <p>The collection is ever expanding, just like our universe.</p>
          </section>
        </div>
        <div className="row">
          <section className="how-to col-12 box">
            <h1>How it works</h1>
            <p><span id="logo">DailyVerse</span> is powered by NASA's Astronomy Picture of the Day (aka APOD) API, which makes the entire APOD collection between 1995 and today accessible.</p>
            <p>Simply pick a day, hit the button, sit back, and enjoy the publication for that date. Or if you are feeling adventurous, hit the "Random" button to jump to a random date.</p>
            <p>Note: <span id="logo">DailyVerse</span> supports mobile and tablet devices by blocking autoplay videos and using lower resolution image backgrounds as to conserve user's bandwith. For optimal viewing experience, please visit The DailyVerse on a desktop browser. Explore the universe in its full glory.</p>
            <p>Links to HD images and videos are always provided.</p>
          </section>
        </div>
        <div className="row">
          <section className="editors-picks col-12 box">
            <h1>Editor's Picks</h1>
            <button onClick={() => this.submitEditorDate('2017-06-07')}>Jun 2017</button>
            <button onClick={() => this.submitEditorDate('2017-07-04')}>Jul 2017</button>
            <button onClick={() => this.submitEditorDate('2018-09-12')}>Sep 2018</button>
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

const mapStateToProps = (state, props) => {
  return {
    date: state.currentPOD.date,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(LandingPage);
