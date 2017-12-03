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

	render() {
		return (
				<div className="SearchBar">
				  <input placeholder="Enter a Song, Album, or Artist" onChange={this.handleTermChange} value={this.state.term}/>
				  <a>SEARCH</a>
				</div>
			);
		}
	}

export default SearchBar;