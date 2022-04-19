import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { firestore } from '../firebase/clientApp';

import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";

const habitsCollection = collection(firestore, 'habits');

import { useEffect, useState } from 'react';


const Home: NextPage = () => {
  const [habits, setHabits] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getHabits = async () => {
    // construct a query to get up to 10 undone todos 
    const habitsQuery = query(habitsCollection, where('done', '==', false), limit(10));
    // get the todos
    const querySnapshot = await getDocs(habitsQuery);

    // map through todos adding them to an array
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    // set it to state
    setHabits(result);
  };

  useEffect(() => {
    // get the todos
    getHabits();
    // reset loading
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  return (
    // <div className={styles.container}>
    // <Head>
    //   <title>Todos app</title>
    //   <meta name="description" content="Next.js firebase todos app" />
    //   <link rel="icon" href="/favicon.ico" />
    // </Head>
    // <main className={styles.main}>
    //   <h1 className={styles.title}>
    //   Todos app
    //   </h1>
    // </main>
    // <footer className={styles.footer}>
    //   <a
    //   href="#"
    //   rel="noopener noreferrer"
    //   >
    //   Todos app
    //   </a>
    // </footer>
    // </div>
 )
}

export default Home
