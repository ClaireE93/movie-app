import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App.js';
import { movies } from './components/movieData.js';

// var movies = [
//   {title: 'Mean Girls',
//   description: "Girls being mean",
//   year: '2005'},
//   {title: 'Hackers',
//   description: 'wow hacking away',
//   year: '1999'},
//   {title: 'The Grey',
//   description: 'Not black?',
//   year: '2017'},
//   {title: 'Sunshine',
//   description: 'Maybe little miss',
//   year: '2001'},
//   {title: 'Ex Machina',
//   description: 'Robots are the worst',
//   year: '2016'},
// ];

ReactDOM.render(<App movies={movies}/>, document.getElementById('app'));
