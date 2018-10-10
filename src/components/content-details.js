import React from 'react';
import { connect } from 'react-redux';

const moment = require('moment');

class ContentDetails extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <p>Image loading...</p>
      );
    } else if (this.props.media_type === 'video') {
      return (
        <p>APOD on this day was a video...</p>
      );
    } else if (!this.props.url) {
      return (
        <p>APOD was not published on this day...</p>
      );
    }

    let date = moment(this.props.date).format('MMMM Do YYYY');

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
