import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './content-details.css';

const moment = require('moment');

class ContentDetails extends React.Component {
  renderSource() {
    let { media_type, url, hdurl } = this.props.currentPOD;
    if (media_type === 'image') {
      return (<a target="_blank" rel="noopener noreferrer" href={hdurl} >Link to Image</a>);
    }
    if (media_type === 'video') {
      return (<a target="_blank" rel="noopener noreferrer" href={url} >Link to Video</a>);
    }
  }

  render() {
    let {
      date,
      url,
      title,
      explanation,
      copyright,
    } = this.props.currentPOD;

    // formats date for presentation
    date = moment(date).format('MMMM Do, YYYY');

    // remove unecessary lines that NASA left in explanations for publications between 2008 to 2009
    if (explanation && explanation.includes('digg_url')) {
      explanation = explanation.slice(-(explanation.length), -78);
    }

    if (this.props.loading) {
      return (
        <article className="content-info">
          <p>Image loading...</p>
        </article>
      );
    }
    if (this.props.error) {
      return (
        <article className="content-info">
          <h1>Whoopsies!</h1>
          <hr />
          <p>Looks like NASA's database is under maintenance. Please try again later.</p>
          <Link to="/">Home</Link>
        </article>
      );
    }
    if (!url) {
      return (
        <article className="content-info">
          <h1>Whoopsies!</h1>
          <hr />
          <p>Looks like NASA did not publish any content on {date}. Please try another date.</p>
          <Link to="/">Home</Link>
        </article>
      );
    }

    return (
      <article className="content-info">
        <h1>{title}</h1>
        <h2>{date}</h2>
        <hr />
        <p>{explanation}</p>
        <p>Copyright: {copyright}</p>
        <hr />
        {this.renderSource()}
        <Link to="/">Home</Link>
      </article>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentPOD: state.currentPOD,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(ContentDetails);
