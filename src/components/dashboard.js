import React from 'react';
import { connect } from 'react-redux';

import DateInput from './date-input.js';
import ContentDetails from './content-details.js';

import '../styles/dashboard.css';

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hideDisplay: false };
  }

  renderBackground() {
    if (this.props.currentPOD.media_type === 'video') return this.renderVideoBackground();
    else return this.renderImageBackground();
  }
  renderImageBackground() {
    let { hdurl } = this.props.currentPOD;
    let imageUrl = hdurl ? hdurl : require('../assets/not-found.gif');
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
    let { url } = this.props.currentPOD;
    let videoId, videoUrl;
    // determine if url is youtube and if comes packed with param '?rel=0'
    if (url.includes('youtube') && url.slice(-6) === '?rel=0') {
      videoId = url.slice(-17, -6);
      videoUrl = url + '&autoplay=1&controls=0&showinfo=0&autohide=1&version=3&loop=1&playlist=' + videoId;
    } else {
      videoId = url.slice(-11);
      videoUrl = url + '?rel=0&autoplay=1&controls=0&showinfo=0&autohide=1&version=3&loop=1&playlist=' + videoId;
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
    let buttonText = this.state.hideDisplay ? '+' : '-';
    return (
      <button className="view-button" onClick={() => this.setState({ hideDisplay: !this.state.hideDisplay })}>{buttonText}</button>
    );
  }

  render() {
    let isHidden = this.state.hideDisplay ? 'hidden' : 'visible';
    return (
      <main>
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

export default connect(mapStateToProps)(DashBoard);
