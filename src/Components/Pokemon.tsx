import React from 'react'
import { ApiResponse } from '../Misc/Interfaces'
import '../Misc/style.css'

export const Pokemon = (props: {pokemon: ApiResponse, sorter:React.Dispatch<React.SetStateAction<keyof ApiResponse>>}) => {
    
    const renderPokemons = (): JSX.Element => {
        const pokemonType: string = props.pokemon.types
        .map((poke: any) => poke.type.name)
        .join(", ");
            return (
                <div className="card">
                    <span className="card--id" onClick={() =>props.sorter("id")}>#{props.pokemon.id}</span>
                    <img className="card--image" src={ props.pokemon.sprites.other['official-artwork'].front_default } alt="" />
                    <h1 className="card--name" onClick={() =>props.sorter("name")}>{props.pokemon.name}</h1>
                    <span className="card--details">{pokemonType}</span>
                </div>
            )
    }

    return (
        <div>
            {renderPokemons()}
        </div>
    )
}