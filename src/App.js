import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import Search from './components/Search/Search';
import Card from './components/Card/Card';
import { fetchAll } from './redux/actions/root'

import './App.scss';

const App = ({ fetchAll, pokemons }) => {
  const [isFetching, setIsFetching] = useState(false);
  // const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchAll();
    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, []);

  const handleScroll = () => {
    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    fetchMorePokemons();
    // eslint-disable-next-line
  }, [isFetching]);

  const fetchMorePokemons = () => {
    fetchAll();
    setIsFetching(false);
  };

  return (
    <div className="App">
      {/* <Search /> */}
      <button onClick={fetchAll}>Fetch</button>

      {pokemons.map((pokemon) => (
         <Card pokemon={pokemon} key={pokemon.name} /> 
      ))}
      {isFetching && <h1>Fetching more list items...</h1>}

    </div>
  );
}

function mapStateToProps(state) {
  return { 
      pokemons: state.pokemons, 
      loading: state.loading, 
      filter: state.filter,
      error: state.error
  }
};

const actionCreators = {
  fetchAll
};

export default connect(mapStateToProps, actionCreators)(App);
