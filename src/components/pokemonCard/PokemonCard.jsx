import "./PokemonCard.css"
import {useEffect, useState} from "react";
import axios from "axios";

const PokemonCard = ({endpoint}) => {

    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await axios.get(endpoint);
                setPokemon(response.data);
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (endpoint) {
            fetchPokemon();
        }
    }, [endpoint])

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
    );
}

export default PokemonCard;