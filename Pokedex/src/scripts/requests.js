export const fetchPokemon = async (pokemonId) => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const data = await fetch(baseUrl).then((response) => response.json());
  return data;
};

export const pokemonTypes = async () => {
  const baseUrl = `https://pokeapi.co/api/v2/type`;
  const data = await fetch(baseUrl).then((response) => response.json());
  return data;
}