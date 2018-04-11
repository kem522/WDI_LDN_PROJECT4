import React from 'react';

const Search = ({handleSort, handleChange}) => {
  return(
    <form>
      <div className="field">
        <input onChange={handleChange} className="wider" type="text" name="search" placeholder="Search by title or year"/>
      </div>
      <div className="select is-rounded is-medium">
        <select onChange={handleSort} name="sort">
          <option value="">Sort by ...</option>
          <option value="desc">Most Popular</option>
          <option value="asc">Least Popular</option>
        </select>
      </div>
    </form>
  );
};

export default Search;
