import React from 'react';
import { connect } from 'react-redux';

import DateInput from './date-input.js';

import '../styles/app.css';

const moment = require('moment');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hideDisplay: false };
  }

  render() {
    if (this.props.loading) {
      return (
        <main>
          <DateInput />
          <p>Image loading...</p>
        </main>
      );
    } else if (this.props.media_type === 'video') {
      return (
        <main>
          <DateInput />
          <p>APOD on this day was a video...</p>
        </main>
      );
    } else if (!this.props.url) {
      return (
        <main style={{
          background: `url(${require('../assets/not-found.gif')}) center center / cover no-repeat fixed`,
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover'
        }}>
          <DateInput />
          <p>APOD was not published on this day...</p>
        </main>
      );
    }

    let date = moment(this.props.date).format('MMMM Do YYYY');

    return (
      <main style={{
        background: `url(${this.props.hdurl}) center center / cover no-repeat fixed`,
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover'
      }}>
        <DateInput />
        <h1>{this.props.title}</h1>
        <p>{date}</p>
        <p>{this.props.explanation}</p>
        <p>Copyright: {this.props.copyright}</p>
        <a target="_blank" rel="noopener noreferrer" href={this.props.hdurl} >Get full image here</a>
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
