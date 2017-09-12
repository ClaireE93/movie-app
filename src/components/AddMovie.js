import React from 'react';

export function AddMovie(props) {
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const input = document.getElementById('input-text');
      props.onClick(input.value);
      input.value = '';
    }
  };

  return (
    <div className="add-bar">
      <input id="input-text" type="text" placeholder="Add a movie" onKeyUp={(e) => handleKeyPress(e)}/>
      <button className="btn" onClick={() => props.onClick(document.getElementById('input-text').value)}>
        <span className="add-button">Add Movie</span>
      </button>
    </div>
  )
}
