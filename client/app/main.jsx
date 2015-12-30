require('./css/main.css');

import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/dashboard.jsx';

main();

function main() {
  ReactDOM.render(<Dashboard />, document.getElementById('app'));
}
