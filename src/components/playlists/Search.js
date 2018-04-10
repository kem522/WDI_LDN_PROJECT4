import React from 'react';

const Search = ({handleSort, handleChange}) => {
  return(
    <form>
      <div className="field">
        <input onChange={handleChange} className="input" type="text" name="search" placeholder="Search by playlist title or by year"/>
      </div>
      <div className="field">
        <select onChange={handleSort} className="select" name="sort">
          <option value="">Sort by ...</option>
          <option value="desc">Most Popular</option>
          <option value="asc">Least Popular</option>
        </select>
      </div>
    </form>
  );
};

export default Search;
