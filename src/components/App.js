import React from 'react';
import { MovieEntry } from './MovieEntry';
import { Search } from './Search'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalMovies: props.movies,
      movies: props.movies,
    }
  }

  handleSearchClick (text) {
    const allMovies = this.state.totalMovies;
    const newCur = [];
    const re = new RegExp(text, 'gi');
    for (let movie of allMovies) {
      const { title } = movie;
      if (title.search(re) !== -1) {
        newCur.push(movie);
      }
    }
    if (newCur.length < 1) {
      newCur.push({title: 'Sorry, no matching movies!'});
    }
    this.setState({movies: newCur});
  }

  render() {
    return (
      <div>
        <div className="searchContainer">
          <Search onClick={(text) => this.handleSearchClick(text)}/>
        </div>
        <div className="movieList">
          {this.state.movies.map((movie) => (
            <MovieEntry key={movie.title} movie={movie}/>
          ))}
        </div>
      </div>
  );
  }
}
