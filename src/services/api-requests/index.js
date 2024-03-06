async function requestPokemons(limit, offset) {
    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    const responsepokemons = await url.json()
    const results = responsepokemons.results
    return results
}
async function requestNamePokemon(name) {
    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const responseNamepokemon = await url.json()
    return responseNamepokemon
}

async function requestAbilityPokemons(ability) {
    const response = await fetch(ability)
    const pokemons = await response.json()
    return pokemons
}


export { requestPokemons, requestNamePokemon, requestAbilityPokemons} 