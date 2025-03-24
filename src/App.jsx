import "./App.css"
import {useState, useEffect} from "react";
import axios from "axios";
import PokemonCard from "./components/pokemonCard/PokemonCard.jsx";
import logo from "./assets/Pokemon_logo.png"
import Button from "./components/Button/Button.jsx";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [endpoint, setEndpoint] = useState("https://pokeapi.co/api/v2/pokemon/");

    useEffect(() => {

        const controller = new AbortController();

        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const response = await axios.get(endpoint, {
                    signal: controller.signal
                });
                setPokemons(response.data);
            } catch (err) {
                setError(err);
                console.error(err)
            } finally {
                setLoading(false);
            }
        }

        fetchPokemons();
        return function cleanup() {
            controller.abort();
        }
    }, [endpoint]);

    return (
        <div className="outer-container">
            <img className="logo" src={logo} alt="Pokémon logo"/>
            <div className="buttons">
                <Button
                    text="Vorige"
                    disabled={!pokemons.previous}
                    clickHandler={() => setEndpoint(pokemons.previous)}/>
                <Button
                    text="Volgende"
                    disabled={!pokemons.next}
                    clickHandler={() => setEndpoint(pokemons.next)}/>
            </div>
            {loading && <div className="pokemon-spinner"></div>}
            {error && <p>We kunnen op dit moment geen Pokémons vinden...</p>}
            <div className="pokemon-deck">
                {pokemons.results && pokemons.results.map((pokemon) => {
                    return <PokemonCard key={pokemon.name} endpoint={pokemon.url}/>
                })}
            </div>
        </div>
    );
}

export default App;