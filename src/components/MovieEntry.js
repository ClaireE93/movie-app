import React from 'react';

export function MovieEntry(props) {
  const { movie } = props;
  return (
    <div className="movie-entry">
      {movie.title}
    </div>
  )
}
