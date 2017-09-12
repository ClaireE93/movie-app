import React from 'react';
import { MovieEntry } from './MovieEntry';
import { Search } from './Search';
import { AddMovie } from './AddMovie';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalMovies: [],
      movies: [],
      watched: [],
      unwatched: [],
      watchFilter: false,
    }
  }

  handleSearchClick(text) {
    const allMovies = this.state.watched.concat(this.state.unwatched);
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

  handleAddClick(text) {
    const obj = {};
    obj.title = text;
    obj.watched = false;
    const newArr = this.state.unwatched.slice();
    newArr.push(obj);
    if (!this.state.watchFilter) {
      this.setState({unwatched: newArr, movies: newArr});
    } else {
      this.setState({unwatched: newArr});
    }

  }

  handleFilterButtonClick(isWatched) {

  }

  render() {
    return (
      <div>
        <div className="addContainer">
          <AddMovie onClick={(text) => this.handleAddClick(text)}/>
        </div>
        <div className="searchContainer">
          <Search onClick={(text) => this.handleSearchClick(text)}/>
        </div>
        <div className="filterContainer">
          <button onClick={() => this.handleFilterButtonClick(true)}>Watched</button>
          <button onClick={() => this.handleFilterButtonClick(false)}>Unwatched</button>
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
