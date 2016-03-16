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
        <header className="navbar navbar-default">
          <p className="navbar-brand"> Dashboard </p>
        </header>
        <div className="container">
          <h3>{this.state.message}</h3>
          <div className="row">
          {

            this.state.pingtests.map(function (pingtest, i) {
              return <div className="col-sm-6"><Pingtest key={i} {...pingtest} /></div>;
            }.bind(this))
          }
          </div>
        </div>
      </div>
    );
  }
}
