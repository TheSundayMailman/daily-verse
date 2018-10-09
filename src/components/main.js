import React from 'react';
import { connect } from 'react-redux';

import '../styles/main.css';

const moment = require('moment');

class Main extends React.Component {
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
        <p>APOD on this day was not found...</p>
      );
    }

    let date = moment(this.props.date).format('MMMM Do YYYY');

    return (
      <main style={{
        background: `url(${this.props.hdurl}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover'
      }}>
        <h1>{this.props.title}</h1>
        <p>{date}</p>
        <p>{this.props.explanation}</p>
        <p>Copyright: {this.props.copyright}</p>
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
