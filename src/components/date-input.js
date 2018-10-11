import React from 'react';
import { connect } from 'react-redux';

import { fetchPOD } from '../actions/pod.js';

import '../styles/date-input.css';

const moment = require('moment');

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputDate: this.props.date,
      dateErrorMessage: null
    };
  }

  // Load APOD of either today or date in store where last left off
  componentDidMount() {
    // const todayDate = this.props.date ? this.props.date : moment().format('YYYY-MM-DD');
    const todayDate = '2018-10-01';
    this.props.dispatch(fetchPOD(todayDate))
    .then(() => this.setState({ inputDate: todayDate }));
  }

  submitDate(e) {
    e.preventDefault();

    // Determine if date is invalid or out of range.
    // This is for browsers that does not supprt HTML5's <input type="date" /> tag.
    const userDate = moment(this.state.inputDate).format('YYYY-MM-DD');
    const minDate = moment('1995-06-16').format('YYYY-MM-DD'); // smallest date allowed
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
      this.props.dispatch(fetchPOD(userDate))
      .then(() => this.setState({ dateErrorMessage: null }));
    }
  }

  renderDateErrorMessage() {
    if (this.state.dateErrorMessage) {
      return (<div className="date-error-message">{this.state.dateErrorMessage}</div>);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderDateErrorMessage()}
        <form className="date-input" onSubmit={e => this.submitDate(e)}>
          <label htmlFor="userDate">Pick a day </label>
          <br />
          <input
            type="date"
            id="userDate"
            min="1995-06-16"
            max={moment().format('YYYY-MM-DD')}
            placeholder="MM/DD/YYYY"
            defaultValue={this.state.inputDate}
            onChange={e => this.setState( { inputDate: e.currentTarget.value })}
          />
          <br />
          <input
            type="submit"
            value="Go"
          />
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { date: state.date };
};

export default connect(mapStateToProps)(DateInput);
