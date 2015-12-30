import React from 'react';
//import ReactDOM from 'react-dom';
import LineChart from './line-chart.jsx';

export default class Pingtest extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <LineChart {...this.props}/>
      </div>
    );
  }
}

