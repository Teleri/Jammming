import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    let checkTerm = window.location.href.match(/term=([^&]*)/);
    if (checkTerm) {
      checkTerm = checkTerm[1];
    } else {
      checkTerm = '';
    }
    this.state = { term: checkTerm, }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    if (checkTerm) {
      this.search();
    }
  }

search() {
	this.props.onSearch(this.state.term);
}

handleTermChange(event) {
	this.setState({ term: event.target.value });
}

handleKeyPress(event) {
  if (event.key === 'Enter') {
    //console.log('The Enter key was pressed!')
    this.props.onSearch(this.state.term);
  }
}

	render() {
		return (
				<div className="SearchBar">
				  <input placeholder="Enter a Song, Album, or Artist" onChange={this.handleTermChange} onKeyDown={this.handleKeyPress} value={this.state.term} />
				  <a onClick={this.search}>SEARCH</a>
				</div>
			);
		}
	}

export default SearchBar;