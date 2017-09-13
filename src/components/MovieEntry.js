import React from 'react';
import { MovieInfoPanel } from './MovieInfoPanel';

export class MovieEntry extends React.Component {

  handleButtonClick () {
    const cur = this.props.movie.watched;
    this.setState({watched: !cur});
    this.props.buttonClick(this.props.id);
  }

  render() {
    return (
      <div className="movie-entry">
        <div>
          <MovieInfoPanel movie={this.props.movie} />
        </div>
        <button onClick={() => this.handleButtonClick()}>{this.props.movie.watched ? "Watched" : "Unwatched"}</button>
      </div>
    );
  }
}
