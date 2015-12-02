import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


const DatePick = React.createClass({
  displayName: 'DatePick',

  getInitialState: function() {
      return {
        startDate: moment()
      };
    },

    handleChange: function(date) {
      this.setState({
        startDate: date
      });
    },

  render: function() {
    return (
      <div className="react-datepick">
      </div>
    );
        // <DatePicker
        //   selected={this.state.startDate}
        //   onChange={this.handleChange} />
  }

});

module.exports = DatePick;
