import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
}




//keys() changes object keys to array
export class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = { term: '' , location: ''  , sortBy: 'best_match' };
    this.handleLocationChange =this.handleLocationChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  getSortByClass(sortByOption) {
    return this.state.sortBy === sortByOption ? 'active': '';
  }

  handleSortByChange(sortByOption) {
    this.setState({sortBy:sortByOption});
  }
 //term base on user input
  handleTermChange(event){
    this.setState({term: event.target.value});
  }
 //location based on what user inputs
  handleLocationChange(event){
    this.setState({location: event.target.value})
  }


  renderSortByOptions(){
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (<li className={this.getSortByClass(sortByOptionValue)}
      onClick={this.handleSortByChange.bind(this,sortByOptionValue)} >
      {sortByOption}</li>
      );
    });
  }

  render(){
    return(
      <div className="SearchBar">
  <div className="SearchBar-sort-options">
    <ul>
      {this.renderSortByOptions}
    </ul>
  </div>
  <div className="SearchBar-fields">
    <input onChange = {this.handleTermChange} placeholder="Search Businesses" />
    <input onChange={this.handleLocationChange} placeholder="Where?" />
  </div>
  <div className="SearchBar-submit">
    <a>Let's Go</a>
  </div>
</div>
    )
  }
}
