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
  
    let invalid = moment(userDate).format('YYYY-MM-DD');
    let outOfRange = (
      moment(userDate).isBefore(moment(minDate)) || moment(userDate).isAfter(moment(maxDate))
    );

    if (outOfRange) {
      this.setState({ dateErrorMessage: 'Date must be between today and June 16, 1995.' });
    } else if (invalid === 'Invalid date') {
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

  renderDateErrorMessage() {
    if (this.state.dateErrorMessage) {
      return (<div className="date-error-message">{this.state.dateErrorMessage}</div>);
    }
  }

  renderGoButton() {
    if (this.props.loading) {
      return (<input type="submit" value="Go" disabled />);
    }
    return (<input type="submit" value="Go" />);
  }

  renderPrevButton() {
    let prevDate, minDate, outOfRange;
    if (this.props.date) {
      prevDate = moment(this.props.date).subtract(1, 'days').format('YYYY-MM-DD');
      minDate = '1995-06-16';
      outOfRange = moment(prevDate).isBefore(moment(minDate))
    }
    if (this.props.loading || outOfRange) {
      return (<button disabled>Prev</button>);
    }
    return (<button onClick={() => this.submitClickDate(prevDate)}>Prev</button>);
  }

  renderNextButton() {
    let nextDate, maxDate, outOfRange;
    if (this.props.date) {
      nextDate = moment(this.props.date).add(1, 'days').format('YYYY-MM-DD');
      maxDate = moment().format('YYYY-MM-DD');
      outOfRange = moment(nextDate).isAfter(moment(maxDate))
    }
    if (this.props.loading || outOfRange) {
      return (<button disabled>Next</button>);
    }
    return (<button onClick={() => this.submitClickDate(nextDate)}>Next</button>);
  }

  render() {
    return (
      <div className="date-input">
        {this.renderDateErrorMessage()}
        <form onSubmit={e => this.submitUserDate(e)}>
          <label htmlFor="userDate">Pick a day </label>
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
        {this.renderNextButton()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    date: state.date,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(DateInput);
