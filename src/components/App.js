import React from 'react';
import { MovieEntry } from './MovieEntry';
import { Search } from './Search';
import { AddMovie } from './AddMovie';

export class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      movies: [],
      unwatched: [],
      watched: [],
      watchFilter: false,
    }
  }

  handleSearchClick(text) {
    const allMovies = this.state.watchFilter ? this.state.watched.slice() : this.state.unwatched.slice()
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
    netflixroulette.createRequest(text, (resp) => {
      this.parseResponse(resp);
    });
  }

  parseResponse(resp) {
    const obj = {};
    obj.title = resp['show_title'];
    obj.year = resp['release_year'];
    obj.rating = resp.rating;
    obj.description = resp.summary;
    obj.poster = resp.poster;

    const newArr = this.state.unwatched.slice();
    newArr.push(obj);
    if (!this.state.watchFilter) {
     this.setState({unwatched: newArr, movies: newArr});
    } else {
     this.setState({unwatched: newArr});
    }
  }

  handleFilterButtonClick(isWatched) {
    if (this.state.watchFilter === isWatched) { return; }
    this.setState({watchFilter: isWatched});
    if (isWatched) {
      this.setState({movies: this.state.watched.slice()});
    } else {
      this.setState({movies: this.state.unwatched.slice()});
    }
  }

  handleWatchedButtonClick(index) {
    const curObj = this.state.movies[index];
    const curStatus = curObj.watched;
    const newObj = Object.assign({}, curObj, {watched: !curStatus});
    if (this.state.watchFilter) {
      const curArr = this.state.watched;
      curArr.splice(index, 1);
      const newArr = this.state.unwatched;
      newArr.push(newObj);
      this.setState({movies: curArr, unwatched: newArr, watched: curArr});
    } else {
      const curArr = this.state.unwatched;
      curArr.splice(index, 1);
      const newArr = this.state.watched;
      newArr.push(newObj);
      this.setState({movies: curArr, unwatched: curArr, watched: newArr});
    }
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
          <button className="filter" onClick={() => this.handleFilterButtonClick(false)}>Unwatched</button>
          <button className="filter" onClick={() => this.handleFilterButtonClick(true)}>Watched</button>
        </div>
        <div className="movieList">
          {this.state.movies.map((movie, index) => (
            <MovieEntry key={movie.title} id={index} movie={movie} buttonClick={this.handleWatchedButtonClick.bind(this)}/>
          ))}
        </div>
      </div>
  );
  }
}
