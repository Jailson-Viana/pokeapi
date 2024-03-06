import { useState, useEffect } from "react";
import { requestNamePokemon} from "../../../services/api-requests";
import { useParams } from "react-router";
import { PokemonDetails } from "../../internal-page-details";

const DetailsPage = () => {
  const [pokemon, setPokemon] = useState();
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestNamePokemon(name);
      setPokemon(data);
    };
    fetchData();
    
  }, []);

  return (
    <div>
      {pokemon !== undefined ? (
        <PokemonDetails pokemon={pokemon} />
      ) : (
        "Pokemon não encontrado, tente novamente!"
      )}
    </div>
  );
};

export { DetailsPage };
