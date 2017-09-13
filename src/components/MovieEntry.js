import React from 'react';

export class MovieEntry extends React.Component {

  handleButtonClick () {
    const cur = this.props.movie.watched;
    this.setState({watched: !cur});
    this.props.buttonClick(this.props.id);
  }

  render() {
    return (
      <div className="movie-entry">
        {this.props.movie.title}
        <button onClick={() => this.handleButtonClick()}>{this.props.movie.watched ? "Watched" : "Unwatched"}</button>
      </div>
    );
  }
}
