import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { fetchCharacterById } from "../api/CharactersFetcher";
import { ThemeContext } from "../Components/ThemeProvider";
const CharacterDetails = () => {
  const { id } = useParams();
  // const id = useParams().id;
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getCharacter();
  }, [id]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }
  if (!character || character.length === 0) {
    return <p>No Characters</p>;
  }
  const { name, image, status, species, gender, origin } = character;
  return (
    <div className={isDarkMode ? "darkCharacterDetails" : "characterDetails"}>
      <h1>{name}</h1>
      <div className="flexContainer">
        <img src={image} alt={name} />
        <div className="info">
          <p>Species: {species}</p>
          <p>Gender: {gender}</p>
          <p>Origin: {origin.name}</p>
          <div className="status">
            <p className={status}>{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CharacterDetails;
