import "./App.css"
import {useState, useEffect} from "react";
import axios from "axios";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";
import logo from "./assets/Pokemon_logo.png"

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/jigglypuff");
                setPokemon(response.data);
            } catch (err) {
                setError(err);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, []);

    return (
        <div className="outer-container">
            <img className="logo" src={logo} alt="Pokémon logo"></img>
            <div className="pokemon-deck">
                <PokemonCard
                    pokemon={pokemon}
                />
            </div>
        </div>

    );
}

export default App