import React from 'react'

const SearchBar = ({handleChange, handleSubmit}) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            />
          <input type="submit" value="See details" />
        </form>
      </div>
    )
}

export default SearchBar