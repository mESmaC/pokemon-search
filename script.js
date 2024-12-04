const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const resultDiv = document.querySelector(".search-results");

const fetchPokemonData = async (query) => {
  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`);
    if (!response.ok) throw new Error("Pokémon not found");
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
    return null;
  }
};

const populateData = (data) => {
  if (!data) return;

  // Update basic information
  document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
  document.getElementById("pokemon-id").textContent = `#${data.id}`;
  document.getElementById("weight").textContent = `${data.weight} kg`;
  document.getElementById("height").textContent = `${data.height} m`;

  // Update stats
  document.getElementById("hp").textContent = `${data.stats[0].base_stat}`;
  document.getElementById("attack").textContent = `${data.stats[1].base_stat}`;
  document.getElementById("defense").textContent = `${data.stats[2].base_stat}`;
  document.getElementById("special-attack").textContent = `${data.stats[3].base_stat}`;
  document.getElementById("special-defense").textContent = `${data.stats[4].base_stat}`;
  document.getElementById("speed").textContent = `${data.stats[5].base_stat}`;

  // Update types
  const typesElement = document.getElementById("types");
  typesElement.innerHTML = "<span>Type(s):</span>"; // Reset with label
  data.types.forEach(typeInfo => {
    const typeElement = document.createElement("span");
    typeElement.textContent = ` ${typeInfo.type.name.toUpperCase()} `;
    typesElement.appendChild(typeElement);
  });

  // Update sprite
  let spriteElement = document.getElementById("sprite");
  if (!spriteElement) {
    spriteElement = document.createElement("img");
    spriteElement.id = "sprite";
    resultDiv.appendChild(spriteElement);
  }
  spriteElement.src = data.sprites.front_default;
  spriteElement.alt = `${data.name} sprite`;
};

const searchPokemon = async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  const data = await fetchPokemonData(query);
  if (data) {
    populateData(data);
  }
};

searchBtn.addEventListener("click", searchPokemon);

