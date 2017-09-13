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

  render() {
    return (
      <div>
        <div className="movie-title" onClick={() => this.handleTitleClick()}>
          {this.props.movie.title}
        </div>
        <div className={this.state.display ? 'detailsVisible' : 'detailsHidden'}>
          <div>Description: {this.props.movie.description}</div>
          <div>Year: {this.props.movie.year}</div>
        </div>
      </div>
    );
  }

}

// { this.props.selected === this.props.className ? 'selected ' + this.props.className : this.props.className }
