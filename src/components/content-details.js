import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/content-details.css';

const moment = require('moment');

class ContentDetails extends React.Component {
  renderSource() {
    if (this.props.media_type === 'image') {
      return (
        <a target="_blank" rel="noopener noreferrer" href={this.props.hdurl} >Link to Image</a>
      );
    }
    if (this.props.media_type === 'video') {
      return (
        <a target="_blank" rel="noopener noreferrer" href={this.props.url} >Link to Video</a>
      );
    }
  }

  render() {
    let date = moment(this.props.date).format('MMMM Do YYYY');

    if (this.props.loading) {
      return (
        <div className="content-info">
          <p>Image loading...</p>
        </div>
      );
    }
    if (this.props.error) {
      return (
        <div className="content-info">
          <h1>Whoopsies!</h1>
          <hr />
          <p>Looks like NASA's database is under maintenance. Please try again later.</p>
          <Link to="/">Home</Link>
        </div>
      );
    }
    if (!this.props.url) {
      return (
        <div className="content-info">
          <h1>Whoopsies!</h1>
          <hr />
          <p>Looks like an APOD was not published on this day. Please try another date.</p>
          <Link to="/">Home</Link>
        </div>
      );
    }

    return (
      <div className="content-info">
        <h1>{this.props.title}</h1>
        <p>{date}</p>
        <hr />
        <p>{this.props.explanation}</p>
        <p>Copyright: {this.props.copyright}</p>
        <hr />
        {this.renderSource()}
        <Link to="/">Home</Link>
      </div>
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
