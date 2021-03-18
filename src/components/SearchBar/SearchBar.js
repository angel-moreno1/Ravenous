import './SearchBar.css'
import { useState } from 'react'

// filteres that allows Yelp Api 
const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count"
}

function SearchBar({ searchYelp }) {
    const [sortBy, setSortBy] = useState("best_match")
    const [term, setTerm] = useState("")
    const [location, setLocation] = useState("")

    const getSortByClass = (sortByOption) => (sortByOption === sortBy) ? "active" : ""
    const handleSortByChange = (sortByOption) => void setSortBy(sortByOption)
    const handleTermChange = ({ target }) => void setTerm(target.value)
    const handleLocationChange = ({ target }) => void setLocation(target.value)
    const handleSearchClick = () => void searchYelp(term, location, sortBy)
    

    return (
        <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {
              Object.keys(sortByOptions).map(
                (option) => ( 
                  <li
                    onClick={() => handleSortByChange(sortByOptions[option])}
                    className={getSortByClass(sortByOptions[option])}
                    key={sortByOptions[option]}
                  >
                    {option}
                  </li>
                )
              )
            }
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input
            placeholder="Search Businesses"
            onChange={handleTermChange} 
          />
          <input
            placeholder="Where?" 
            onChange={handleLocationChange} 
          />
        </div>
        <div className="SearchBar-submit" onClick={handleSearchClick}>
          <button>Let's Go</button>
        </div>
      </div>
    )
}


export default SearchBar
