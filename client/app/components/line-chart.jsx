import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';
import Line from './charts/line.js';

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    $.get(this.props.apiUrl + '?' + $.param({key: this.props.keyName, duration: this.props.duration, since: this.props.since}), function(result) {
      result = result.map(function (row) {
        return {
          x: new Date(row.Timestamp),
          y: row.AvgResponseTime,
        };
      });

      this.setState({
        data: result,
      }, function () {
        var line = new Line(ReactDOM.findDOMNode(this), this.state.data);

        var socket = io.connect(this.props.apiUrl + '/' + this.props.keyName);
        socket.on('tick', function (data) {
          line.tick({
            x: new Date(data.Timestamp),
            y: data.AvgResponseTime,
          });
        });
      });
    }.bind(this));
    //line.tick();
  }
  render() {
    return <div className="chart"></div>;
  }
}

