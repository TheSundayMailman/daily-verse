import React from 'react';
import { connect } from 'react-redux';

import { fetchPOD } from '../actions/pod.js';

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
          <p>APOD on {this.props.date} was a video...</p>
        </main>
      );
    }
    return (
      <main>
        <h1>{this.props.title}</h1>
        <p>{this.props.date}</p>
        <img src={this.props.hdurl} alt="NASA's APOD"></img>
        <p>{this.props.explanation}</p>
        <p>Photo Credit: {this.props.copyright}</p>
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
