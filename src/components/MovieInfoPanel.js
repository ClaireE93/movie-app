import React from 'react';

export class MovieInfoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    }
  }

  handleTitleClick() {
    const curDisplay = this.state.display;
    this.setState({display: !curDisplay});
  }

  handleButtonClick () {
    const cur = this.props.movie.watched;
    this.setState({watched: !cur});
    this.props.buttonClick(this.props.id);
  }

  render() {
    return (
      <div>
        <div className="movie-title" onClick={() => this.handleTitleClick()}>
          {this.props.movie.title}
        </div>
        <div className={this.state.display ? 'detailsVisible' : 'detailsHidden'}>
          <img src={this.props.movie.poster}/>
          <div>Description: {this.props.movie.description}</div>
          <div>Year: {this.props.movie.year}</div>
          <div>Rating: {this.props.movie.rating}</div>
          <button onClick={() => this.handleButtonClick()}>{this.props.movie.watched ? "Watched" : "Unwatched"}</button>
        </div>
      </div>
    );
  }
}
