const initialState = {
    pokemons: [],
    filter: '',
    currentPokemon: null,
    loading: false,
    error: null
};

export default function mainReducer(state = initialState, action) {
    switch(action.type) {
        case 'POKEMON_FETCH_REQUESTED':
            return {...state, loading: true};
        case 'POKEMON_FETCH_SUCCEEDED':
            return {...state, 
                    pokemons: action.payload.pokemons,
                    loading: false};
        case 'POKEMON_FETCH_FAILED':
            return {...state, error: action.payload, loading: false}
        case 'SET_FILTER':
            return {...state, filter: action.payload}
        case 'SET_POKEMON':
            return {...state, currentPokemon: action.payload}
        default:
            return state;
    };
};