import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import StarWars from "../../src/pages/StarWars";

export default function People() {
    const router = useRouter()

    const { people } = router.query //gets query params from url

    const queryClient = useQueryClient()

    const [page, setPage] = useState(0)

    useEffect(() => {
        if (people) {
            setPage(parseInt(String(people)))
        }

    }, [people])


    const { data, isLoading, error }: any = useQuery(['people', page], async () => await fetch(`https://swapi.dev/api/people/?page=${page} `).then(res => res.json()))


    return <StarWars data={data} isLoading={isLoading} error={error} page={page} setPage={setPage} queryClient={queryClient} />
}