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
    const classes = {
      "details-hidden": !this.state.display,
      "details-visible": this.state.display,
    };
    return (
      <div>
        <div className="movie-title" onClick={() => this.handleTitleClick()}>
          {this.props.movie.title}
        </div>
        <div className={classes}>

        </div>
      </div>
    );
  }

}
