import React from 'react';

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userDate: '2017-12-31' };
  }

  logDate(e) {
    e.preventDefault();
    console.log(this.state.userDate);
    // this.setState({ userDate: e.currentTarget.value });
  }

  render() {
    return (
      <form onSubmit={e => this.logDate(e)}>
        <label htmlFor="userDate">Pick a day</label>
        <input
          type="date"
          id="userDate"
          defaultValue={this.state.userDate}
          onChange={e => this.setState( {userDate: e.currentTarget.value})}
        />
        <input
          type="submit"
        />
      </form>
    );
  }
}

export default DateInput;
