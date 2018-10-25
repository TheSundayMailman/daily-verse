import React from 'react';
import { connect } from 'react-redux';

import DateInput from './date-input.js';
import ContentDetails from './content-details.js';

import './explore-page.css';

// Media Query Listener
// for loading either HD or normal images depending on whether viewport is 800px or greater
const mql = window.matchMedia('(min-width: 800px)');

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hideDisplay: false };
  }

  renderBackground() {
    if (this.props.currentPOD.media_type === 'video') return this.renderVideoBackground();
    else return this.renderImageBackground();
  }
  renderImageBackground() {
    let { url, hdurl } = this.props.currentPOD;
    let imageUrl = url;
    // if viewport is greater than 800px and image has HD url, use HD url
    if (mql.matches && hdurl) imageUrl = hdurl;
    // if no image url at all, use 'not-found.gif'
    if (!url || !hdurl) imageUrl = require('../assets/not-found.gif');
    return (
      <div className="image-background" style={{
        background: `url(${imageUrl}) center center / cover no-repeat fixed`,
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
        zIndex: '-99'
      }}>
      </div>
    );
  }
  renderVideoBackground() {
    let videoUrl = this.props.currentPOD.url;
    // determine if url is YouTube and if comes packed with param '?rel=0' or '?rel=0&showinfo=0'
    if (videoUrl.includes('youtube.com')) {
      const videoId = videoUrl.slice(30, 41);
      if (!videoUrl.includes('?rel=0')) videoUrl += '?rel=0';
      if (!videoUrl.includes('&showinfo=0')) videoUrl += '&showinfo=0';
      if (!videoUrl.includes('&controls=0')) videoUrl += '&controls=0';
      // add following parameters to allow autoplay and loop for YouTube videos
      videoUrl = videoUrl + '&autohide=1&mute=1&autoplay=1&version=3&loop=1&playlist=' + videoId;
      // future consideration:
      // the following returns just the base youtube url (40 if the url starts with 'http' instead of 'https')
      // videoUrl = videoUrl.slice(0,41);
      // from which params can be flexibly added
    }
    if (videoUrl.includes('vimeo.com')) {
      videoUrl += '&muted=1&autoplay=1&loop=1';
    }
    return (
      <div className="video-background">
        <div className="video-foreground">
          <iframe title="video" frameBorder="0" height="100%" width="100%" src={videoUrl} allowFullScreen></iframe>
        </div>
    </div>
    )
  }

  renderDisplayButton() {
    let buttonText = this.state.hideDisplay ? 'Show Details' : 'Hide Details';
    return (
      <button className="view-button" onClick={() => this.setState({ hideDisplay: !this.state.hideDisplay })}>{buttonText}</button>
    );
  }

  render() {
    let isHidden = this.state.hideDisplay ? 'hidden' : 'visible';
    return (
      <main className="explore">
        {this.renderBackground()}
        {this.renderDisplayButton()}
        <div className={isHidden}><DateInput /></div>
        <div className={isHidden}><ContentDetails /></div>
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentPOD: state.currentPOD,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(ExplorePage);
