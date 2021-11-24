import { call, put, takeEvery } from 'redux-saga/effects'

function* workerSaga() {
    try {
        const payload = yield call(fetchAll);
        yield put({ type: "POKEMON_FETCH_SUCCEEDED", payload });
    } catch (e) {
        yield put({ type: "POKEMON_FETCH_FAILED", message: e.message });
    }
}

function* pokemonSaga() {
    yield takeEvery("POKEMON_FETCH_REQUESTED", workerSaga);
}


async function fetchAll() {
    let pokemons = [];
    let offset = '10';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
        const res = await response.json();
        res.results.forEach(item => {
            let name;
            let type;
            let image;
            let color;
            let abilitiesArr = [];
            let movesArr = [];

            fetchPokemon(item.url).then(result => {
                name = result.name.charAt(0).toUpperCase() + result.name.slice(1);
                type = result.types[0].type.name.charAt(0).toUpperCase() + result.types[0].type.name.slice(1);
                image = result.sprites.other.dream_world.front_default;

                result.abilities.forEach(item => {
                    const ability = item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1).replace('-', ' ');
                    abilitiesArr.push(ability);
                });

                result.moves.forEach(item => {
                    fetchMoves(item.move.url).then(res => {
                        const name = res.name.charAt(0).toUpperCase() + res.name.slice(1).replace('-', ' ');
                        const description = res.effect_entries[0].short_effect;
                        const move = { name, description };
                        movesArr.push(move);
                    })
                });
                
                fetchSpecies(result.species.url).then(resp => {
                    color = resp.color.name;
                    pokemons.push({ name, type, image, color, abilitiesArr, movesArr });
                });
            });
        })

        return { pokemons }
    }
    catch (error) {
        throw new Error('Falha ao carregar lista de pokemons.')
    }
}

async function fetchPokemon(url) {
    try {
        let pokemon;
        await fetch(url).then(response => response.json()).then(response => {
            pokemon = response;
        })
        return pokemon;
    } catch (error) {
        throw new Error('Falha ao carregar pokemon.')
    }
}

async function fetchMoves(url) {
    try {
        const response = await fetch(url);
        const moves = response.json();
        return moves;
    } catch (error) {
        throw new Error('Falha ao carregar movimentos.')
    }
}

async function fetchSpecies(url) {
    try {
        const response = await fetch(url);
        const species = response.json();
        return species;
    } catch (error) {
        throw new Error('Falha ao carregar espécie.')
    }
}

export default pokemonSaga;