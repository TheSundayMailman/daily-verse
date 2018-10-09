import React from 'react';
import { connect } from 'react-redux'

import { fetchPOD } from '../actions/pod.js'

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDate: this.props.date,
      errorMessage: null
    };
  }

  componentDidMount() {
    const userDate = '2017-12-31';
    this.props.dispatch(fetchPOD(userDate))
    .then(() => this.setState({ userDate }));
  }

  submitDate(e) {
    e.preventDefault();
    const current = new Date(this.state.userDate);
    const now = new Date();
    if (current.getTime() > now.getTime()) {
      this.setState({ errorMessage: 'Date must be between today and June 16, 1995.' });
    } else {
      this.props.dispatch(fetchPOD(this.state.userDate))
      .then(() => this.setState({ errorMessage: null }));
    }
  }

  render() {
    let errorMessage;
    if (this.state.errorMessage) {
      errorMessage = this.state.errorMessage;
    }
    return (
      <React.Fragment>
      <div className="date-error">{errorMessage}</div>
      <form onSubmit={e => this.submitDate(e)}>
        <label htmlFor="userDate">Pick a day</label>
        <input
          type="date"
          id="userDate"
          min="1995-06-16"
          defaultValue={this.state.userDate}
          onChange={e => this.setState( { userDate: e.currentTarget.value })}
        />
        <input
          type="submit"
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
