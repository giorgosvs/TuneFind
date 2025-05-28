import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { SearchResult } from "./componets/SearchResult";
import { Header } from "./componets/Header";
import { Footer } from "./componets/Footer";
import { FilterBox } from "./componets/FilterBox";
import { About } from "./componets/About";

import { IconButton, CircularProgress } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function App() {
  const [results, setResults] = useState([]); //results array for the request
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); //search query state
  const [viewFilters, setViewFilters] = useState(false); //set view of filter box
  const [filters, setFilters] = useState({
    media: "all",
    country: "all",
    limit: 50,
  });
  const [sortOption, setSortOption] = useState("none"); //sorting options state none,alphabetical, realease date

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  }); //favorites state

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); //state wether issearched or not

  useEffect(() => {
    const formattedQuery = searchQuery.trim().replace(/ /g, "+");

    if (!formattedQuery) {
      //reset search term
      setLoading(false);
      setSearched(false);
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      //added some debounce to perform less api calls
      if (searchQuery) {
        const fetchData = async () => {
          //fetch from api fata function
          setLoading(true);
          setSearched(true);

          try {
            const baseUrl = "https://itunes.apple.com/search";
            const params = new URLSearchParams(); //params array for the url making at which we make the request to athe api

            params.append("term", searchQuery);
            params.append("limit", filters.limit.toString());

            if (filters.country && filters.country !== "all") {
              params.append("country", filters.country);
            }

            if (filters.media && filters.media !== "all") {
              params.append("media", filters.media);
            }

            if (filters.genre && filters.genre !== "all") {
              params.append("entity", filters.genre);
            }
            const proxyUrl = `https://corsproxy.io/?${baseUrl}?${params.toString()}`;

            // console.log(proxyUrl);

            const response = await fetch(proxyUrl);

            const data = await response.json(); // to json
            // const data = JSON.parse(json.contents); //enter contents array
            // console.log(data.results);

            let sortedResults = data.results || [];

            if (sortOption === "alpha") {
              //sort alphabetically
              sortedResults.sort((a, b) => {
                const nameA = (
                  a.trackName ||
                  a.collectionName ||
                  ""
                ).toLowerCase();
                const nameB = (
                  b.trackName ||
                  b.collectionName ||
                  ""
                ).toLowerCase();
                return nameA.localeCompare(nameB);
              });
            } else if (sortOption === "date") {
              sortedResults.sort((a, b) => {
                //sort by most recent date
                return new Date(b.releaseDate) - new Date(a.releaseDate);
              });
            }

            setResults(sortedResults);
            setTotalResults(data.resultCount || 0);
          } catch (err) {
            console.log(err);
            setResults([]);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, filters, sortOption]);

  const handleInputChange = (e) => {
    const formatted = e.target.value.trim().replace(/ /g, "+"); ///format query whitespace to + sign
    setSearchQuery(formatted); //changes input value
    // console.log(searchQuery);
  };

  const showMore = () => {
    setFilters((prev) => ({
      ...prev,
      limit: Math.min(prev.limit + 50, 200), //increase limit attribute
    }));
  };

  const handleViewFilters = () => {
    setViewFilters((prev) => !prev);
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (fav) =>
          fav.trackId === item.trackId || fav.collectionId === item.collectionId
      );
      const updated = exists
        ? prev.filter(
            (fav) =>
              fav.trackId !== item.trackId &&
              fav.collectionId !== item.collectionId
          )
        : [...prev, item];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main className="main-content">
                <h1>Welcome to TuneFind</h1>
                <p>Search for tracks, albums or artists</p>

                <br />
                {viewFilters && (
                  <FilterBox
                    filters={filters}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                    onFilterChange={setFilters}
                  />
                )}

                <div className="search-bar-wrapper">
                  <input
                    className="input-search"
                    type="text"
                    placeholder="Search"
                    onChange={handleInputChange}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleViewFilters}
                    aria-label="Toggle filters"
                    sx={{ border: "2px solid #40e0d0", ml: 1 }}
                  />
                  <FilterAltIcon style={{ color: "#40e0d0" }} />
                </div>
                {results.length > 0 && (
                  <p>
                    Found total of <strong>{totalResults}</strong> items.
                  </p>
                )}
                {results.length > 0 &&
                  results.map((item) => (
                    <SearchResult
                      key={item.trackId || item.collectionId}
                      item={item}
                      isFavorite={favorites.some(
                        (fav) =>
                          fav.trackId === item.trackId ||
                          fav.collectionId === item.collectionId
                      )}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}

                {loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "1.5rem 0",
                    }}
                  >
                    <CircularProgress
                      color="inherit"
                      size="3rem"
                    ></CircularProgress>
                  </div>
                )}
                {!loading && searched && results.length === 0 && (
                  <p>No results found.</p>
                )}
                {filters.limit < totalResults && filters.limit < 200 && (
                  <button onClick={showMore}>Show More</button>
                )}
              </main>
            }
          ></Route>
          <Route path="/about" element={<About />} />
          <Route
            path="/favorites"
            element={
              <main className="main-content">
                <h1>Your Favorites</h1>
                {favorites.length === 0 ? (
                  <p>No favorites yet</p>
                ) : (
                  favorites.map((item) => (
                    <SearchResult
                      key={item.trackId || item.collectionId}
                      item={item}
                      isFavorite={true}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))
                )}
              </main>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
