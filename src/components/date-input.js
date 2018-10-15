import React from 'react';
import { connect } from 'react-redux';

import { fetchPOD } from '../actions/pod.js';

import '../styles/date-input.css';

const moment = require('moment');

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.props.date,
      dateErrorMessage: null
    };
  }

  // Load APOD of either today or date in store where last left off
  componentDidMount() {
    const todayDate = this.props.date ? this.props.date : moment().format('YYYY-MM-DD');
    this.props.dispatch(fetchPOD(todayDate))
    .then(() => this.setState({ currentDate: todayDate }));
  }

  submitUserDate(e) {
    e.preventDefault();

    // Determine if date is invalid or out of range.
    // This is for browsers that does not supprt HTML5's <input type="date" /> tag.
    const userDate = moment(this.state.currentDate).format('YYYY-MM-DD');
    const minDate = '1995-06-16'; // smallest date allowed
    const maxDate = moment().format('YYYY-MM-DD'); // largest date allowed, aka today
  
    const outOfRange = moment(userDate).isBefore(moment(minDate)) || moment(userDate).isAfter(moment(maxDate));

    if (outOfRange) {
      this.setState({ dateErrorMessage: 'Date must be between today and June 16th, 1995.' });
    } else if (userDate === 'Invalid date') {
      this.setState({ dateErrorMessage: 'Please enter a valid date.' });
    } else {
      // All validations passed, date is good.
      this.props.dispatch(fetchPOD(userDate))
      .then(() => this.setState({ currentDate: this.props.date }))
      .then(() => this.setState({ dateErrorMessage: null }));
    }
  }

  submitClickDate(clickDate) {
    this.props.dispatch(fetchPOD(clickDate))
    .then(() => this.setState({ currentDate: this.props.date }))
    .then(() => this.setState({ dateErrorMessage: null }));
  }

  renderLabel() {
    if (this.state.dateErrorMessage) {
      return (<label htmlFor="userDate" className="date-error-message">{this.state.dateErrorMessage}</label>);
    }
    return (<label htmlFor="userDate">Jump to date:</label>)
  }

  renderGoButton() {
    if (this.props.loading) {
      return (<input className="submit-button" type="submit" value="Go" disabled />);
    }
    if (this.state.currentDate &&
      (moment(this.state.currentDate).format('YYYY-MM-DD') === moment(this.props.date).format('YYYY-MM-DD'))) {
      return (<input className="submit-button" type="submit" value="Go" disabled />);
    }
    return (<input className="submit-button" type="submit" value="Go" />);
  }

  renderPrevButton() {
    let prevDate, minDate, outOfRange;
    if (this.props.date) {
      prevDate = moment(this.props.date).subtract(1, 'days').format('YYYY-MM-DD');
      minDate = '1995-06-16';
      outOfRange = moment(prevDate).isBefore(moment(minDate))
    }
    if (this.props.loading || outOfRange) {
      return (<button className="submit-button" disabled>{'<<'}</button>);
    }
    return (<button className="submit-button" onClick={() => this.submitClickDate(prevDate)}>{'<<'}</button>);
  }

  renderRandomButton() {
    if (this.props.loading) {
      return (<button className="submit-button" disabled>Random</button>);
    }
    const randomDate = this.generateRandomDate();
    return (<button className="submit-button" onClick={() => this.submitClickDate(randomDate)}>Random</button>);
  }
  generateRandomDate() {
    let start = new Date(1995, 5, 16); // start date, which is 1995-06-16
    let end = new Date(); // end date, which is today
    let random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return moment(random).format('YYYY-MM-DD');
  }

  renderNextButton() {
    let nextDate, maxDate, outOfRange;
    if (this.props.date) {
      nextDate = moment(this.props.date).add(1, 'days').format('YYYY-MM-DD');
      maxDate = moment().format('YYYY-MM-DD');
      outOfRange = moment(nextDate).isAfter(moment(maxDate))
    }
    if (this.props.loading || outOfRange) {
      return (<button className="submit-button" disabled>{'>>'}</button>);
    }
    return (<button className="submit-button" onClick={() => this.submitClickDate(nextDate)}>{'>>'}</button>);
  }

  render() {
    return (
      <div className="date-input">
        <form onSubmit={e => this.submitUserDate(e)}>
          {this.renderLabel()}
          <br />
          <input
            type="date"
            id="userDate"
            min="1995-06-16"
            max={moment().format('YYYY-MM-DD')}
            placeholder="MM/DD/YYYY"
            value={this.state.currentDate}
            onChange={e => this.setState( { currentDate: e.currentTarget.value })}
          />
          <br />
          {this.renderGoButton()}
        </form>
        <hr />
        {this.renderPrevButton()}
        {this.renderRandomButton()}
        {this.renderNextButton()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    date: state.currentPOD.date,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(DateInput);
