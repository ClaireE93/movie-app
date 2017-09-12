import React from 'react';

export class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curVal: '',
    }
  }

  handleChange(e) {
    this.setState({
      curVal: e.target.value
    });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleClick(event.target.value)
    }
  }

  handleClick(val) {
    this.props.onClick(val);
    this.setState({curVal: ''});
  }

  render() {
    return (
      <div className="add-bar">
        <input id="input-text" type="text" placeholder="Add a movie" value={this.state.curVal}
          onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}/>
        <button className="btn" onClick={() => this.handleClick(this.state.curVal)}>
          <span className="add-button">Add Movie</span>
        </button>
      </div>
    );
  }
}
