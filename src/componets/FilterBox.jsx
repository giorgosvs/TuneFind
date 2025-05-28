import React from "react";

export const FilterBox = ({ filters, onFilterChange, sortOption, onSortChange }) => {
  const mediaTypes = [
    "all",
    "movie",
    "podcast",
    "music",
    "musicVideo",
    "audiobook",
    "shortFilm",
    "tvShow",
    "software",
    "ebook",
  ];

  const countries = [
    { code: "all", name: "All" }, 
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "JP", name: "Japan" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: name === "limit" ? parseInt(value, 10) : value,
    });
  };

  return (
    <form className="filter-box">
      <label htmlFor="MediaType">Media : </label>
      <select
        name="media"
        id="media"
        onChange={handleChange}
        value={filters.media}
      >
        {mediaTypes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label htmlFor="sort">Sort by : </label>
      <select
  name="sort"
  id="sort"
  value={sortOption}
  onChange={(e) => onSortChange(e.target.value)}
>
        <option value="none">None</option>
        <option value="alpha">Alphabetical (A–Z)</option>
        <option value="date">Release Date (Newest First)</option>
      </select>

      <label htmlFor="country">Country:</label>
      <select
        name="country"
        id="country"
        onChange={handleChange}
        value={filters.country}
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
      <label htmlFor="Limit">Limit : </label>
      <select name="limit" id="limit" onChange={handleChange}>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={150}>150</option>
        <option value={200}>200</option>
      </select>
    </form>
  );
};
