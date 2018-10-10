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

  render() {
    let isHidden = this.state.hideDisplay ? 'hidden' : 'visible'
    if (!this.props.url || this.props.media_type === 'video') {
      return (
        <main style={{
          background: `url(${require('../assets/not-found.gif')}) center center / cover no-repeat fixed`,
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover'
        }}>
          {this.renderToggleButton()}
          <header className={isHidden}><DateInput /></header>
          <section className={isHidden}><ContentDetails /></section>
        </main>
      );
    }

    return (
      <main style={{
        background: `url(${this.props.hdurl}) center center / cover no-repeat fixed`,
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover'
      }}>
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
