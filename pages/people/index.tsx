import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import StarWars from "../../src/pages/StarWars";


export default function People() {
    const queryClient = useQueryClient()

    const [page, setPage] = useState(1)

    const { data, isLoading, error } = useQuery(['people', page], () => fetch(`https://swapi.dev/api/people/?page=${page} `).then(res => res.json()))

    // * Fetching data using useEffect instead of useQuery 
    // const [data, setData] = useState()

    // useEffect(() => {
    //     fetch(`https://swapi.dev/api/people/?page=${page} `).then(res => res.json().then(data => setData(data)))
    //     console.log(data)
    // }, [page])


    interface People {
        data: any;
        isLoading: boolean;
        error: any;
        page: number;
        setPage: React.Dispatch<React.SetStateAction<number>>;
        queryClient: any;
    }

    return <StarWars data={data} isLoading={isLoading} error={error} page={page} setPage={setPage} queryClient={queryClient} />


}