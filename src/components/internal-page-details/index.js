import { useState, useEffect, useContext } from "react"
import { requestAbilityPokemons } from "../../services/api-requests"
import { ThemeContext } from "../../contexts"
import styled from 'styled-components'

const PokemonDetails = (props) => {
    const [ability, setAbility] = useState()
    const { theme } = useContext(ThemeContext)

    const pokemon = props.pokemon
    const abilities = pokemon.abilities
    const abilitiesUrl = abilities.map((element) => {
        return element.ability.url
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = abilitiesUrl.map(async (element) => {

                return (await requestAbilityPokemons(element))
            })
            const results = await Promise.all(data)
            setAbility(results)
        }
        fetchData()
    }, [])
   
    return (

        <Container style={{ color: theme.color, backgroundColor: theme.background }}>
            <Div>
                <Name>{pokemon.name}</Name>
                <div>
                    <Img src={pokemon.sprites.front_default} alt='Imagem-pokemon'></Img>
                </div>

                <p>{pokemon.types.map((types, index) => {
                    return (<Type key={index} type={types.type.name}> {types.type.name}</Type>)
                })}</p>

                <List>{pokemon.moves.map((moves, index) => {
                    return (<Itens key={index}>{moves.move.name}/</Itens>)
                })}
                </List>
                <AblityContainer>
                    {ability !== undefined ? ability.map((ability, index) => {
                        return (
                            <div key={index}>
                                <h4><Ability>Abilidade - </Ability>{ability.name}</h4>
                                <p>{ability.effect_entries[1].language.name === "en" ? ability.effect_entries[1].effect : ability.effect_entries[0].effect}</p>
                            </div>)

                    }) : "Carregando abilidades..."}
                </AblityContainer>
            </Div>
        </Container>
    )
}
const Container = styled.div`
min-height: 100vh;
padding:15px;
text-align:center;
display: flex;
align-items:space-around;
justify-content: center;
flex-direction:row-reverse;
@media (max-width: 768px){
    display:block;
  }
`
const Div = styled.div`
width: 80%;
margin:15px;
padding:15px;
border:solid 3px;
border-radius: 2%;
@media (max-width: 768px){
    width: 98%;
    padding:10px;
    margin: auto;
  }
`
const Name = styled.h1`
font-size: 30px;
text-transform: uppercase;
font-weight:800
`
const Img = styled.img`
width: 20%;
margin:30px;
border:solid 1px;
border-radius: 100%;
@media (max-width: 768px){
    width: 50%
  }
`
const Type = styled.span`
font-weight: 700;
font-size: 20px;
text-transform: uppercase;
color:#004D40;
`
const List = styled.ul`
display: flex;
flex-wrap: wrap;
justify-content: center;
list-style:none;
font-weight:800
`
const Itens = styled.li`
margin: 5px 5px ;
text-transform: capitalize;
`
const AblityContainer = styled.div`
margin:10px;
border:solid 1.5px;
border-radius: 5px;
`
const Ability = styled.span`
font-weight: 700;
color:#004D40;
`
export { PokemonDetails }
