import React from 'react';
import { connect } from 'react-redux';

import '../styles/content-details.css';

const moment = require('moment');

class ContentDetails extends React.Component {
  renderSource() {
    if (this.props.media_type === 'video') {
      return (
        <a target="_blank" rel="noopener noreferrer" href={this.props.url} >See full video</a>
      );
    }
    if (this.props.media_type === 'image') {
      return (
        <a target="_blank" rel="noopener noreferrer" href={this.props.hdurl} >See full image</a>
      );
    }
  }

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

    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <p>{date}</p>
        <p>{this.props.explanation}</p>
        <p>Copyright: {this.props.copyright}</p>
        {this.renderSource()}
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
