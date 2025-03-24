import "./PokemonCard.css"

const PokemonCard = ({pokemon}) => {

    return (
        <div className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img className="pokemon-image"
                 alt={`Afbeelding van ${pokemon.name}`}
                 src={pokemon.sprites?.other?.[`official-artwork`]?.[`front_default`]}
            />
            <div className="pokemon-card-text">
                <p className="pokemon-card-bold-text">Moves: </p>
                <p>{pokemon.moves?.length}</p>
            </div>
            <div className="pokemon-card-text">
                <p className="pokemon-card-bold-text">Weight: </p>
                <p>{pokemon.weight}</p>
            </div>
            <div className="pokemon-card-abilities">
                <p className="pokemon-card-bold-text">Abilities: </p>
                <ul className="pokemon-card-abilities-list">
                    {pokemon.abilities?.map((ability, index) => {
                        return (
                            <li key={index}>
                                {ability.ability.name}
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}

export default PokemonCard;