import React from 'react';

export class MovieEntry extends React.Component {
  constructor(props) {
    super();
    this.state = {
      movie: props.movie,
      id: props.id,
      watched: props.movie.watched,
    }
  }

  handleButtonClick () {
    const cur = this.state.watched;
    this.setState({watched: !cur});
    this.props.buttonClick(this.state.id)
  }

  render() {
    return (
      <div className="movie-entry">
        {this.state.movie.title}
        <button onClick={() => this.handleButtonClick()}>{this.state.watched ? "Watched" : "Unwatched"}</button>
      </div>
    );
  }
}
