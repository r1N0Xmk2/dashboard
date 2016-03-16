require('./css/main.css');
require('bootstrap-webpack!../bootstrap.config.js');
var $ = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/dashboard.jsx';

main();

function main() {
  ReactDOM.render(<Dashboard />, document.getElementById('app'));
}
