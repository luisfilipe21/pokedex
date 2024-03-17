import { fetchPokemon, pokemonTypes } from "./requests.js";
import { handledarkMode } from "./theme.js";

const createCard = ({ id, name, hp, image, types, attack, defense, speed, typeColor }) => {

  const card = document.createElement("li");

  // Adicionando esse style aqui, me possibilita acessar a variável 'typeColor' e dinamizar o background de todos os cards

  card.style = `background: radial-gradient(circle at 12% 62%, ${typeColor}, var(--color-grey-3) 80%)`;

  card.classList.add('card');

  const favId = `fav-${id}`;
  const favList = JSON.parse(localStorage.getItem('@pokedex:favs')) || []

  const favIcon = favList.includes(favId) ? `<i id = ${favId} class="icon__fav fa-solid fa-star card__fav--fill"></i>` : `
  <i id = ${favId} class="icon__fav fa-regular fa-star"></i>`


  card.innerHTML = `
  ${favIcon}
  <p class="card__hp"><span>HP</span>${hp}</p>
  <img class="card__image" src=${image} alt="" />
  <h2 class="card__name">${name}</h2>
  <small class="card__type">${types}</small>

  <ul class="card__stats">
    <li class="card__stat">
      <h3 class="stat__value">${attack}</h3>
      <p class="stat__type">Atq</p>
    </li>

    <li class="card__stat">
      <h3 class="stat__value">${defense}</h3>
      <p class="stat__type">Def</p>
    </li>

    <li class="card__stat">
      <h3 class="stat__value">${speed}</h3>
      <p class="stat__type">Vel</p>
    </li>
  </ul>
  `

  return card
}

const findStats = (stats, statsName) => {
  return stats.find((element) => element.stat.name === statsName).base_stat;
}
const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const pokemonData = (pokemon) => {
  const id = pokemon.id
  const name = capitalizeName(pokemon.name);

  // encontra o array de tipos dos pokemons
  const rawTypes = pokemon.types.map(element => element.type.name);

  // trabalha em cima de cada elemento do array para colocar em maiúsculo e juntando elas com o join 
  const types = rawTypes.map(element => capitalizeName(element)).join(' - ');

  // cor de fundo dos cards de acordo com o tipo do pokemon;

  const typeColor = `var(--color-${rawTypes[0]})`;

  const hp = findStats(pokemon.stats, 'hp');
  const attack = findStats(pokemon.stats, 'attack');
  const defense = findStats(pokemon.stats, 'defense');
  const speed = findStats(pokemon.stats, 'speed');

  const image = pokemon.sprites.other.dream_world.front_default;

  return {
    id,
    name,
    types,
    hp,
    attack,
    defense,
    speed,
    image,
    typeColor,
  }
}

const renderPokemons = async (cardQuantity = 34) => {
  for (let i = 0; i < cardQuantity; i++) {
    const cardList = document.querySelector('.cards');

    const pokemon = await fetchPokemon(i + 1)
    const processedData = pokemonData(pokemon)

    const card = createCard(processedData);
    
    cardList.appendChild(card)
  }
}

const handleFavoritePokemon = () => {
  const favIcons = document.querySelectorAll('.icon__fav');

  favIcons.forEach((button) => {
    button.addEventListener('click', (e) => {

      const listFav = JSON.parse(localStorage.getItem('@pokedex:favs')) || [];

      if (button.classList.contains('fa-regular')) {
        button.classList.replace('fa-regular', 'fa-solid');

        listFav.push(e.target.id)
        localStorage.setItem('@pokedex:favs', JSON.stringify(listFav))
      } else {
        button.classList.replace('fa-solid', 'fa-regular')

        const updatedListFav = listFav.filter((element) => {
          return element !== e.target.id;
        })
        localStorage.setItem('@pokedex:favs', JSON.stringify(updatedListFav))
      }

      button.classList.toggle('card__fav--fill')
    })
  })
}

const getTypes = async () => {
  const main = document.querySelector(".list__type");

  const rawData = await pokemonTypes();
  const allTypes = rawData.results

  allTypes.forEach(type => {
    const select = document.createElement('li');

    select.classList.add('pokemon__type');
    select.innerText = type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase();
    select.id = type.name;

    main.appendChild(select)
  })
  
  return main
}

await renderPokemons(50)
handledarkMode()
handleFavoritePokemon()