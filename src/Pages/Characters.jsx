import React, { useState, useEffect, useContext } from "react";
import { fetchCharacters } from "../api/CharactersFetcher";
import CharacterCard from "../Components/CharacterCard";
import "./_styles.css";
import { ThemeContext } from "../Components/ThemeProvider";
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters(currentPage);
        setCharacters(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getCharacters(currentPage);
  }, [currentPage]);
  const handelSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const filteredCharacters = (characters) => {
  //   return characters.filter((character) =>
  //     character.name.toLowerCase().
  //   includes(searchTerm.toLowerCase())
  //   );
  // };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }
  if (!characters || characters.length === 0) {
    return <p>No Characters</p>;
  }

  return (
    <div className={isDarkMode ? "darkCharactersPage" : "charactersPage"}>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          className="searchBar"
          value={searchTerm}
          onChange={handelSearch}
        />
      </div>

      {filteredCharacters.length === 0 && (
        <p className="noResults" noResults>
          No Characters Found
        </p>
      )}
      <div className="charactersContainer">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} props={character} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={goToNextPage}>Next</button>
      </div>
    </div>
  );
};
export default Characters;
