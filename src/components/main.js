import React from 'react';
import { connect } from 'react-redux';

import { fetchPOD } from '../actions/pod.js';

import DateInput from './date-input.js';

import '../styles/main.css';

class Main extends React.Component {
  componentDidMount() {
    const userDate = '2017-12-31';
    this.props.dispatch(fetchPOD(userDate));
  }

  render() {
    if (this.props.loading) {
      return (
        <main>
          <p>Image loading...</p>
        </main>
      );
    } else if (this.props.media_type === 'video') {
      return (
        <main>
          <p>APOD that day was a video...</p>
          <DateInput />
        </main>
      );
    } else if (!this.props.url) {
      return (
        <main>
          <p>APOD that day was not found...</p>
          <DateInput />
        </main>
      );
    }
    return (
      <main>
        <h1>{this.props.title}</h1>
        <p>{this.props.date}</p>
        <p>{this.props.explanation}</p>
        <p>Photo Credit: {this.props.copyright}</p>
        <DateInput />
        <img src={this.props.hdurl} alt="NASA's APOD"></img>
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
