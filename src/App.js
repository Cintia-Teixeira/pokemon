import React, { useState, useEffect } from 'react';
import Search from './components/Search/Search';
import Card from './components/Card/Card';

import './App.scss';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [pokemonData, setPokemonData] = useState({
    name: '',
    color: '',
    image: '',
    type: '',
    moves: [],
    abilities: []
  });
  const [cardDisplay, setCardDisplay] = useState('none');

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  const fetchData = async () => {
    setTimeout(async () => {
      try {
        await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
        .then(response => response.json())
        .then(response => {
          response.results.forEach(item => {
              let colorName;
              let abilitiesArr = [];
              let movesArr = [];

              fetch(item.url).then(res => res.json()).then(res => {
                res.abilities.forEach(data => {
                  const ability = data.ability.name.charAt(0).toUpperCase() + data.ability.name.slice(1).replace('-', ' ');
                  abilitiesArr.push(ability);
                });

                res.moves.forEach(item => {
                  fetch(item.move.url).then(resp => resp.json()).then(resp => {
                    const name = resp.name.charAt(0).toUpperCase() + resp.name.slice(1).replace('-', ' ');
                    const description = resp.effect_entries[0].short_effect;
                    const move = { name, description };
                    movesArr.push(move);
                  });
                });

                fetch(res.species.url).then(resp => resp.json().then(resp => {
                  colorName = resp.color.name;
                  setPokemonData({
                    name: res.name.charAt(0).toUpperCase() + res.name.slice(1),
                    color: colorName,
                    image: res.sprites.other.dream_world.front_default,
                    type: res.types[0].type.name.charAt(0).toUpperCase() + res.types[0].type.name.slice(1),
                    moves: movesArr,
                    abilities: abilitiesArr
                  });
                }));
                setCardDisplay('block');
              })
            })
          });

        setOffset(offset + 10);

        setPokemonList(() => {
          return [...pokemonList, pokemonData];
        });

      } catch (e) {
        console.log(e);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMorePokemons();
  }, [isFetching]);

  const fetchMorePokemons = () => {
    fetchData();
    setIsFetching(false);
  };

  return (
    <div className="App">
      <Search />

      {pokemonList.map((pokemon) => (
        pokemon.name.length > 0 ? <Card display={cardDisplay} pokemon={pokemon} key={pokemon.name} /> : null
      ))}
      {isFetching && <h1>Fetching more list items...</h1>}

    </div>
  );
}

export default App;
