import React from 'react';
import { MovieEntry } from './MovieEntry';
import { Search } from './Search';
import { AddMovie } from './AddMovie';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      totalMovies: [],
      filter: 'all', //NOTE: Options are 'all', 'watched', 'unwatched'
    }
  }

  handleSearchClick(text) {
    const allMovies = this.state.totalMovies;
    const newCur = [];
    const newHidden = [];
    const re = new RegExp(text, 'gi');
    const filter = this.state.filter === 'watched' ? true : false;
    for (let movie of allMovies) {
      const { title } = movie;
      if (title.search(re) !== -1 && (this.state.filter === 'all' || movie.watched === filter)) {
        newCur.push(movie);
      }
    }
    console.log('newCur is', newCur);
    if (newCur.length < 1) {
      // newCur.push({title: 'Sorry, no matching movies!', watched: this.state.filter});
      //TODO: Handle empty search
    }
    this.setState({movies: newCur});
  }

  handleAddClick(text) {
    const obj = {};
    obj.title = text;
    obj.watched = false;
    const newArr = this.state.movies;
    newArr.push(obj);
    const newTot = this.state.totalMovies;
    newTot.push(obj);
    this.setState({movies: newArr, totalMovies: newTot});
  }

  handleFilterClick(type) {
    if (this.state.filter === type) { return; }
    this.setState({filter: type});
  }

  handleWatchClick(targetInd) {
    const curMovies = this.state.movies;
    const cur = curMovies[targetInd];
    const curStatus = cur.watched;
    const newObj = Object.assign({}, cur, {watched: !curStatus});
    const newCurrentArr = curMovies.slice();
    newCurrentArr.splice(targetInd, 1, newObj);
    let totalTargetInd;
    for (let i = 0; i < this.state.totalMovies.length; i++) {
      if (this.state.totalMovies[i].title === cur.title) {
        totalTargetInd = i;
        break;
      }
    }
    const newTotalArr = this.state.totalMovies.slice();
    newTotalArr.splice(totalTargetInd, 1, newObj);
    this.setState({movies: newCurrentArr, totalMovies: newTotalArr});
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
          <button onClick={() => this.handleFilterClick('all')}>All</button>
          <button onClick={() => this.handleFilterClick('watched')}>Watched</button>
          <button onClick={() => this.handleFilterClick('unwatched')}>To Watch</button>
        </div>
        <div className="movieList">
          {this.state.movies.map((movie, index) => {
            if (this.state.filter === 'all') {
              return <MovieEntry key={index} id={index} movie={movie} handleWatchClick={this.handleWatchClick.bind(this)}/>
            } else if (this.state.filter === 'watched') {
              if (movie.watched === true) {
                return <MovieEntry key={index} id={index} movie={movie} handleWatchClick={this.handleWatchClick.bind(this)}/>
              }
            } else if (this.state.filter === 'unwatched') {
              if (movie.watched === false) {
                return <MovieEntry key={index} id={index} movie={movie} handleWatchClick={this.handleWatchClick.bind(this)}/>
              }
            }
          })}
        </div>
      </div>
  );
  }
}
