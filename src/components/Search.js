import React from 'react';

export function Search(props) {
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      props.onClick(document.getElementById('search-text').value);
    }
  }
  return (
    <div className="search-bar">
      <input id="search-text" type="text" onKeyUp={(e) => handleKeyPress(e)}/>
      <button className="btn hidden-sm-down" onClick={() => props.onClick(document.getElementById('search-text').value)}>
        <span className="search-button-text">Search</span>
      </button>
    </div>
  )
}
