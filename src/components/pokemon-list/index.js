import React, { useState, useEffect, useContext } from "react"
import { requestPokemons, requestNamePokemon } from "../../services/api-requests"
import styled from 'styled-components'
import { ThemeContext } from "../../contexts"
import { ThemeTogglerButton } from "../button-toggler-theme"
import { Link } from "react-router-dom"
import { CgAddR } from "react-icons/cg";

function PokemonsList() {
    const limitList = 10;
    const [pokemons, setPokemons] = useState([]);
    const [limitOffset, setLimitOffset] = useState(0);
    const { theme } = useContext(ThemeContext)
    const [search, setsearch] = useState("")

    const addPokemonList = () => {
        setLimitOffset(limitOffset + limitList)
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await requestPokemons(limitList, limitOffset);
            const pokemonsNames = response.map(function (pokemon) {
                return pokemon.name;
            })
            const pokemonsPromises = pokemonsNames.map(async (pokemonName) => await requestNamePokemon(pokemonName));
            const paginatedPokemons = await Promise.all(pokemonsPromises);
            setPokemons([...pokemons, ...paginatedPokemons]);
        };
        fetchData();
    }, [limitOffset]);

    const searchLowercase = search.toLocaleLowerCase();
    const pokemonsFilter = pokemons.filter((element) =>
        element.types[0].type.name.toLocaleLowerCase().includes(searchLowercase));

        const ImgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"

    return (
        <Div style={{ color: theme.color, backgroundColor: theme.background }}>
            <header>

                <ThemeToggleDiv>
                    
                    <p><ImgLogo src={ImgUrl} alt="pokeApi"></ImgLogo></p>
                    <Input placeholder="Buscar pokemon pelo tipo" type="search" value={search} onChange={(e) => setsearch(e.target.value)} />
                    <ThemeTogglerButton />
                </ThemeToggleDiv>
            </header>
            <main>
                <MainDiv >
                    {pokemonsFilter.map((element, index) => {

                        return (
                            <Pokemons key={index} >
                                <NavLink to={`${element.name}`}>
                                    <div>
                                        <H2Name style={{ color: theme.color }}> {element.name}</H2Name>
                                        <P>___________</P>
                                        <Img src={element.sprites.front_default} alt="Img-pokemon"></Img>

                                    </div>
                                </NavLink>
                            </Pokemons>
                        )
                    })}
                </MainDiv>
            </main >
            <footer>
                <FooterDiv>
                    <CgAddR onClick={addPokemonList} fontSize='50px' cursor='pointer' />
                </FooterDiv>
            </footer>
        </Div>
    );
}
const ImgLogo = styled.img`
height: 90%;
width: 80%;
@media (max-width: 400px){
    width: 100%;
}
`
const Input = styled.input`
margin:10px;
font-size:14px;
border-radius:3px;
border:solid 1px;
height: 20px;
width: 26%;
@media (max-width: 400px){
    width: 50%;
}
`
const Div = styled.div`
min-height: 100vh;
`
const ThemeToggleDiv = styled.div`
display: flex;
align-items:center;
padding:10px;
padding-right:60px;
justify-content:space-between;
background:#EF5350;

@media (max-width: 400px){
    padding:25px;
}
`
const MainDiv = styled.main`
display: flex;
flex-wrap:wrap;
justify-content:center;
padding: 10px;
margin:10px;
@media (max-width: 768px){
    display: block;
}
`
const Pokemons = styled.div`
margin:2px;
height: 23rem;
text-align:center;
width: 16%;
border-radius: 6px;
border: 2px solid;
box-shadow: 1px 5px 6px 1px rgba(0, 0, 0, 0.2);
font-size: 16px;
transition: all 100ms ease-in-out;
box-sizing: border-box;
&:hover{
    border: 6px solid ;
    animation: rotateButton 0.7s ease-in-out both;
  };

@media (max-width: 768px){
    width: 70%;
    margin: 3% auto
}

@media (max-width: 400px){
    width: 90%;
    margin: 5% auto
}`

const NavLink = styled(Link)`
  padding: 20px;
  color: black;
  text-decoration: none;
`
const H2Name = styled.h2`
font-weight: 900;
font-size: 18px;
text-transform:uppercase;
`
const P = styled.p`
font-weight: 900;
padding:10px;
`
const Img = styled.img`
border:solid 1px;
border-radius: 50%;
@media (max-width: 768px){
    width:45%
  }

  @media (max-width: 400px){
    width: 65%;
`
const FooterDiv = styled.div`
display: flex;
justify-content:center;
padding-bottom:20px;
`
export { PokemonsList } 