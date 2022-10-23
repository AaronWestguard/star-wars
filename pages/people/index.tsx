import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import styles from './index.module.css';

export default function People() {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    // * Fetching data using useEffect instead of useQuery 
    // const [data, setData] = useState()

    const { data, isLoading, error } = useQuery(['people', page], () => fetch(`https://swapi.dev/api/people/?page=${page} `).then(res => res.json()))

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: ... </div>

    // * Fetching data using useEffect instead of useQuery 
    // useEffect(() => {
    //     fetch(`https://swapi.dev/api/people/?page=${page} `).then(res => res.json().then(data => setData(data)))
    //     console.log(data)
    // }, [page])

    console.log(data)

    function SortPeople() {

        let sortedPeople = data.results.sort((a, b) => {

            b.mass - a.mass
        }
        )
        //sorted mass doesnt work properly because of unknown
        console.log(sortedPeople)
        let newData = {
            ...data, data: { results: sortedPeople }
        }

        // sortedPeople = { ...data, results: sortedPeople }
        //sort people data by mass
        queryClient.setQueryData(['people', page], newData)
    }




    function NextPage() {
        setPage(page => page + 1)
    }

    function PrevPage() {
        setPage(page => page - 1)
    }

    function MapPeople() {
        return data.results.map((person) => {
            return (
                <div key={person.name}>
                    <h2>{person.name}</h2>
                    <p> Height: {person.height}
                        Mass: {person.mass}
                        Hair Color: {person.hair_color}
                        Skin Color: {person.skin_color}
                        Gender: {person.gender}

                    </p>


                </div>
            )
        })
    }

    return (
        <div>
            <h1>Star Wars</h1>
            <h2>Page: {page}</h2>
            <MapPeople />

            <button onClick={SortPeople}>Sort by mass</button>
            <button disabled={data.next == null} onClick={NextPage}>Next</button>
            <button disabled={data.previous == null} onClick={PrevPage}>Previous</button>

        </div>

    )

}