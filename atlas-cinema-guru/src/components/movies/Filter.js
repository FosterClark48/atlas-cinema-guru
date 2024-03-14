import React from 'react';
import './movies.css';
import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

function Filter({
  minYear, setMinYear, maxYear, setMaxYear, sort,
  setSort, genres, setGenres, title, setTitle
}) {

    // Array of genres for Tag mapping
    const genreOptions = [
      "action", "drama", "comedy", "biography", "romance",
      "thriller", "war", "history", "sport", "sci-fi",
      "documentary", "crime", "fantasy"
    ];

    // Sorting options for SelectInput
    const sortOptions = [
      { value: "latest", label: "Latest" },
      { value: "oldest", label: "Oldest" },
      { value: "highestrated", label: "Highest Rated" },
      { value: "lowestrated", label: "Lowest Rated" }
    ];

  return (
    <div className="Filter">
      <SearchBar title={title} setTitle={setTitle} />
      <Input
        label="Min Year:"
        type="number"
        className="year-input"
        value={minYear}
        setValue={setMinYear}
      />
      <Input
        label="Max Year:"
        type="number"
        className="year-input"
        value={maxYear}
        setValue={setMaxYear}
      />
      <SelectInput
        label="Sort By:"
        options={sortOptions}
        className="sort-select"
        value={sort}
        setValue={setSort}
      />
      <div className="genres-tags">
        {genreOptions.map((genre) => (
          <Tag
            key={genre}
            genre={genre}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
