import axios from "axios";
export const fetchCharacters = async (page) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  return response.data.results;
};
export const fetchCharacterById = async (id) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return response.data;
};
