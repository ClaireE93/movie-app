import React from 'react';

export class MovieEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props.movie,
      watched: props.watched
    }
  }

  handleClick() {
    const cur = this.state.watched;
    this.setState({watched: !cur});
    this.props.handleWatchClick(this.props.id);
  }

  render() {
    return (
      <div className="movie-entry">
        {this.state.movie.title}
        <span>
          <button className="watch-button" onClick={() => this.handleClick()}>{this.state.watched ? "Watched!" : "To Watch"}</button>
        </span>
      </div>
    )
  }
}
