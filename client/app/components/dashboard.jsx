import React from 'react';
import $ from 'jquery';
import Pingtest from './pingtest.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      pingtests: [],
    };
  }
  componentDidMount() {
    $.ajax({
      type: 'get',
      url: '/pingtests.json',
      error: function (xhr) {
        if (xhr.status === 404) {
          this.setState({
            message: 'pingtest.json not found.',
          });
        }
      }.bind(this),
      success: function (pingtests) {
        this.setState({
          pingtests: pingtests,
        });
      }.bind(this),
    });
    //$.get('/pingtests.jsona', function (pingtests, status) {
      //this.setState({
        //pingtests: pingtests,
      //});
      //console.log(status);
    //}.bind(this));
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>{this.state.message}</p>
        {
          this.state.pingtests.map(function (pingtest, i) {
            return <Pingtest key={i} {...pingtest} />;
          }.bind(this))
        }
      </div>
    );
  }
}
