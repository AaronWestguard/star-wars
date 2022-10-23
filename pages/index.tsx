import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a style={{ color: "yellow" }} href="/people">People!</a>
      </h1>
    </>
  )
}

export default Home
