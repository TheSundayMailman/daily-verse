import React from 'react';
import { connect } from 'react-redux';

import DateInput from './date-input.js';
import ContentDetails from './content-details.js';

import '../styles/app.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hideDisplay: false };
  }

  renderToggleButton() {
    let buttonText = this.state.hideDisplay ? '+' : '-';
    return (
      <button onClick={() => this.setState({ hideDisplay: !this.state.hideDisplay })}>{buttonText}</button>
    );
  }

  renderImageBackground() {
    let imageUrl = this.props.hdurl ? this.props.hdurl : require('../assets/not-found.gif');
    if (this.props.media_type === 'video') imageUrl = null;
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
    if (this.props.media_type === 'video') {
      let videoId = this.props.url.slice(-17, -6);
      let videoUrl = this.props.url + '&autoplay=1&controls=0&showinfo=0&autohide=1&version=3&loop=1&playlist=' + videoId;
      return (
        <div className="video-background">
          <div className="video-foreground">
            <iframe title="video" frameBorder="0" height="100%" width="100%" src={videoUrl} allowFullScreen></iframe>
          </div>
      </div>
      )
    }
  }

  render() {
    let isHidden = this.state.hideDisplay ? 'hidden' : 'visible';
    return (
      <main>
        {this.renderImageBackground()}
        {this.renderVideoBackground()}
        {this.renderToggleButton()}
        <header className={isHidden}><DateInput /></header>
        <section className={isHidden}><ContentDetails /></section>
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    date: state.date,
    title: state.title,
    copyright: state.copyright,
    explanation: state.explanation,
    media_type: state.media_type,
    url: state.url,
    hdurl: state.hdurl,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(Main);
