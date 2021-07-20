import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { ApiResponse, Type } from '../Misc/Interfaces'
import { Pokemon } from './Pokemon'
import { SearchBox } from './SearchBox'
import FilterButton from './FilterButton'


export const Search = () => {

    const PokeApi = "https://pokeapi.co/api/v2/pokemon/"

    const [pokemon, setPokemon] = useState<ApiResponse[]>([])
    const [allTypes, setAllTypes] = useState<Type[]>([])

    const [filteredPokemon, setFilteredPokemon] = useState<ApiResponse[]>([])

    const [sortType, setSortType] = useState<keyof ApiResponse>("id")
    const [filterType, setFilterType] = useState<Type[]>([])



    const getPokemon = (query: string | number): Promise<void> => {
        return axios.get<ApiResponse>(PokeApi + query)
            .then((response) => {
                setPokemon([...pokemon, response.data])
                addAbsentType(response.data.types)
            })
    }

    const addAllTypes = (pokemons: ApiResponse[]) => {
        pokemons.forEach((p) => {
            addAbsentType(p.types)
        })
    }

    const addAbsentType = (pokemonType: Type[]) => {
        pokemonType.forEach(t => {
            setAllTypes((allTypes) => allTypes.filter(f => f.type.name !== t.type.name).concat(t))
        })
    }

    const getAllOriginalPokemons = useCallback(async (numPoke: number[]) => {
        let pokeResponses: ApiResponse[] = []
        await Promise.all(numPoke.map(poke => {
            return axios.get<ApiResponse>(PokeApi + poke).then((response) => {
                pokeResponses.push(response.data)
            })
        }))
        return pokeResponses
    }, []);

    const sortPokemon = (pokemonParam: ApiResponse[]): ApiResponse[] => {
    const sortArray = [...pokemonParam].sort((a: ApiResponse, b: ApiResponse) => {
      if (a[sortType] > b[sortType]) return 1;
      else if (b[sortType] > a[sortType]) return -1;
      return 0;
    });
        return sortArray;
    }

    useEffect(() => {
        getAllOriginalPokemons(Array.from(Array(10), (_, i) => i + 1)).then(response => {
            setPokemon(sortPokemon(response))
            addAllTypes(response)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setPokemon((pokemon) => sortPokemon(pokemon))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType])

    useEffect(() => {
        setFilterType(allTypes)
    }, [allTypes])

    useEffect(() => {
        setFilteredPokemon(pokemon.filter((poke) =>
            poke.types.some(p => JSON.stringify(filterType).includes(JSON.stringify(p)))))
    }, [pokemon, filterType])


    return (
        <div className="app">
            <SearchBox search={getPokemon} />
            <div className="buttonDiv">
                {allTypes.map((ft, index) => {
                    return <FilterButton key={index} pokeType={ft} filter={filterType} setFilter={setFilterType}/>
                })}
            </div>
            <div>
                <p className="numberText">Number of pokemons: { filteredPokemon.length }</p>
            </div>
            <div>
                {filteredPokemon.map((poke, index) => {
                    return <Pokemon key={index} pokemon={poke} sorter={setSortType}/>
                    
                })}
            </div>
            
        </div>
    )
}

