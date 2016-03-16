import React from 'react';
//import ReactDOM from 'react-dom';
import LineChart from './line-chart.jsx';

export default class Pingtest extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.title}</div>
        <div className="panel-body">
          <LineChart {...this.props}/>
        </div>
      </div>
    );
  }
}

