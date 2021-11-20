import React, { useState } from 'react';
import Card from '../Card/Card';

const Search = () => {
  const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState({
    id: null,
    name: '',
    color: '',
    image: '',
    type: '',
    moves: [],
    abilities: []
  });
  const [cardDisplay, setCardDisplay] = useState('none');

  const getPokemon = async () => {
    let abilitiesArr = [];
    let movesArr = [];
    let color;

    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(response => {
          response.abilities.forEach(data => {
            const ability = data.ability.name.charAt(0).toUpperCase() + data.ability.name.slice(1).replace('-', ' ');
            abilitiesArr.push(ability);
          });

          fetch(response.species.url).then(res => res.json().then(res => {
            color = res.color.name;
          }));

          response.moves.forEach(item => {
            fetch(item.move.url).then(res => res.json()).then(res => {
              const name = res.name.charAt(0).toUpperCase() + res.name.slice(1).replace('-', ' ');
              const description = res.effect_entries[0].short_effect;
              const move = {name, description};
              movesArr.push(move);

              setPokemonData({
                id: response.id,
                name: response.name.charAt(0).toUpperCase() + response.name.slice(1),
                color: color,
                image: response.sprites.other.dream_world.front_default,
                type: response.types[0].type.name.charAt(0).toUpperCase() + response.types[0].type.name.slice(1),
                moves: movesArr,
                abilities: abilitiesArr
              });
            });
          })
        });

    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
    setCardDisplay('block');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="enter pokemon name"
          />
        </label>
      </form>
      <Card display={cardDisplay} pokemon={pokemonData} />
    </>
  );
}

export default Search;
