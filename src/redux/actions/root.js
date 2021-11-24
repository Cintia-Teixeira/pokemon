export function fetchAll() {
    return {
        type: 'POKEMON_FETCH_REQUESTED'
    }
};

export function setFilter(filter) {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
};

export function setPokemon(pokemonId) {
    return {
        type: 'SET_POKEMON',
        payload: pokemonId
    }
}