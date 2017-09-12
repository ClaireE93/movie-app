import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App.js';

const movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'},
];

ReactDOM.render(<App movies={movies}/>, document.getElementById('app'));
