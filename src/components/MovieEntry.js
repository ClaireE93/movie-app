import React from 'react';
import { MovieInfoPanel } from './MovieInfoPanel';

export const MovieEntry = (props) => (
  <div className="movie-entry">
      <MovieInfoPanel movie={props.movie} buttonClick={props.buttonClick} id={props.id} />
  </div>
);
