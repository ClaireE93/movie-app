import React from 'react';

export function Search(props) {
  const handleKeyPress = (e) => {
    props.onClick(document.getElementById('search-text').value);
  }

  return (
    <div className="search-bar">
      <input id="search-text" type="text" placeholder="Search a movie" onChange={(e) => handleKeyPress(e)}/>
      <button className="btn hidden-sm-down" onClick={() => props.onClick(document.getElementById('search-text').value)}>
        <span className="search-button-text">Search</span>
      </button>
    </div>
  )
}
