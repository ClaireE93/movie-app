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
    }
  }

  handleSearchClick(text) {
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

  handleAddClick(text) {
    const obj = {};
    obj.title = text;
    const newArr = this.state.totalMovies.slice();
    newArr.push(obj);
    this.setState({totalMovies: newArr, movies: newArr})
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
        <div className="movieList">
          {this.state.movies.map((movie) => (
            <MovieEntry key={movie.title} movie={movie}/>
          ))}
        </div>
      </div>
  );
  }
}
