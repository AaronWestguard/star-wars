import React, { useState, useEffect } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import styles from './StarWars.module.css';


interface People {
    data: any;
    isLoading: boolean;
    error: any;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    queryClient: any;
}

export default function StarWars({ data, isLoading, error, page, setPage, queryClient }: People) {
    const [parent] = useAutoAnimate<HTMLDivElement>() //sets ref for auto-animate

    function SortPeople() {
        let sortedPeople = data.results.sort((a: any, b: any) => {

            // if (a.mass == "unknown") {
            //     return 1
            // }
            if (b.mass == "unknown") {
                return -1
            }

            if (parseInt(a.mass) > parseInt(b.mass)) {
                return -1
            }

            if (parseInt(a.mass) < parseInt(b.mass)) {
                return 1
            }

            return 0
        }
        )

        let newData = {
            ...data, data: { results: sortedPeople }
        }

        queryClient.setQueryData(['people', page], newData) //updates react query cache to the new sorted data
    }

    interface Person {
        name: string,
        height: number,
        mass: any,
        hair_color: string,
        skin_color: string,
        gender: string
    }

    function MapPeople() {
        return data?.results?.map((person: Person) => {
            return (
                <div className={styles.card} key={person.name}>
                    <h2>{person.name}</h2>
                    <ul className={styles.list}>
                        <li>Height: {person.height} </li>
                        <li>Mass: {person.mass} </li>
                        <li>Hair Color: {person.hair_color} </li>
                        <li>Skin Color: {person.skin_color} </li>
                        <li>Gender: {person.gender} </li>
                    </ul>
                </div>
            )
        })
    }

    function NextPage() {
        setPage(page => page + 1)
    }

    function PrevPage() {
        setPage(page => page - 1)
    }

    return (
        <div >
            <h1 className={styles.title}>Star Wars</h1>
            <h2 className={styles.title}>Page: {page}</h2>
            <div className={styles.buttonContainer}>
                <button className={styles.button} disabled={data?.previous == null} onClick={PrevPage}>Previous</button>
                <button className={styles.button} disabled={data?.next == null} onClick={NextPage}>Next</button>
            </div>
            <div ref={parent} className={styles.cardContainer}>
                {error && <div>Something went wrong</div>}
                {isLoading && <h1>Loading...</h1>}
                {data && <MapPeople />}
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={SortPeople}>Sort by mass</button>
            </div>
        </div>

    )
}