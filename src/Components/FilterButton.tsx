import React, { useState } from 'react'
import { Type } from '../Misc/Interfaces'
import '../Misc/style.css'

const FilterButton = (props: {
    pokeType: Type,
    filter: Type[],
    setFilter: React.Dispatch<React.SetStateAction<Type[]>>
}) => {

    const [isActive, setActive] = useState(true)

    const toggelFilter = () => {
        setActive(!isActive)
        props.filter.includes(props.pokeType) ? props.setFilter(props.filter.filter(function (name, index, arr) {
            return name!==props.pokeType
        })) : props.setFilter([...props.filter, props.pokeType])
    }
    return (
        <div className="buttonDiv">
            <button className={isActive? "card active": "card"} onClick={toggelFilter}>{ props.pokeType.type.name }</button>
        </div>
    )
}

export default FilterButton
