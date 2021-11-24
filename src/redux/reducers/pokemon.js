const initialState = {
    name: '',
    color: '',
    image: '',
    type: '',
    moves: [],
    abilities: [],
    showMoves: false,
};

export default function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOADED_ABILITIES':
            return {...state, abilities: action.payload}
        case 'LOAD_MOVES': 
            return {...state, showMoves: action.payload}
        case 'MOVES_REQUESTED':
            return {...state, loadingMove: true}
        case 'MOVES_LOADED':
            return {...state, loadingMove: false, moves: action.payload}
        default:
            return state;
    }
};