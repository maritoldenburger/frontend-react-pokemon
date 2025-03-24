import "./App.css"
import {useState, useEffect} from "react";
import axios from "axios";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";
import logo from "./assets/Pokemon_logo.png"

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/");

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const response = await axios.get(endpoint);
                setPokemons(response.data.results);
            } catch (err) {
                setError(err);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }

        fetchPokemons();
    }, [endpoint]);

    return (
        <div className="outer-container">
            <img className="logo" src={logo} alt="Pokémon logo"/>
            {loading && <p>Loading Pokémon...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && (
                <div className="pokemon-deck">
                    {pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.name} endpoint={pokemon.url}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;