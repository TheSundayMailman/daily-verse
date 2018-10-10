import React from 'react';
import { connect } from 'react-redux';

import '../styles/content-details.css';

const moment = require('moment');

class ContentDetails extends React.Component {
  render() {
    let date = moment(this.props.date).format('MMMM Do YYYY');

    if (this.props.loading) {
      return (
        <p>Image loading...</p>
      );
    }
    if (!this.props.url) {
      return (
        <p>APOD was not published on this day...</p>
      );
    }
    if (this.props.media_type === 'video') {
      let videoUrl = 'https://www.youtube.com/embed/R60m1W7t1og?rel=0&autoplay=1&controls=0&showinfo=0&autohide=1&version=3&loop=1&playlist=R60m1W7t1og';
      // let videoUrl = this.props.url + '&autoplay=1&loop=1&controls=0&showinfo=0&autohide=1&playlist=R60m1W7t1og';
      return (
        <React.Fragment>
          <div className="video-background">
            <div className="video-foreground">
              <iframe title="video" frameBorder="0" height="100%" width="100%" src={videoUrl} allowFullScreen></iframe>
            </div>
          </div>
          <h1>{this.props.title}</h1>
          <p>{date}</p>
          <p>{this.props.explanation}</p>
          <p>Copyright: {this.props.copyright}</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <p>{date}</p>
        <p>{this.props.explanation}</p>
        <p>Copyright: {this.props.copyright}</p>
        <a target="_blank" rel="noopener noreferrer" href={this.props.hdurl} >Get full image here</a>
      </React.Fragment>
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

export default connect(mapStateToProps)(ContentDetails);
