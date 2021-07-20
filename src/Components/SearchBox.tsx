import React, { useState } from 'react'

interface SearchBoxProps {
    search(query: string): any
}

export const SearchBox = ({ search }: SearchBoxProps) => {

    const [query, setquery] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        search(query)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setquery(event.target.value)
    }

    return (
        <div className="searchBox">
            <form onSubmit={handleSubmit}>
                <input type="text" name="searchBox" onChange={handleChange} />
            </form>
        </div>
    )
}
