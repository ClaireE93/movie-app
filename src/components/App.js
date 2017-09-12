import React from 'react';
// import { MovieEntry } from './MovieEntry'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies,
    }
  }

  render() {
    return (
      <div>
        <div className="movieList">
          {/* {props.movies.map((movie) => (
            // <MovieEntry key={movie.title} movie={movie}/>
          ))} */}
        </div>
      </div>
  );
  }
}
