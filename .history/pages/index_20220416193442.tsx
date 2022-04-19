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

  console.log(firestore)
  const getHabits = async () => {
    // construct a query to get up to 10 undone todos 
    const habitsQuery = query(habitsCollection, where('Title', '==', 'Study'), limit(10));
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
    }, 1000)
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Todos app</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Todos app
        </h1>
        <div className={styles.grid}>
          {
            loading ? (
              <div className={styles.card}>
                <h2>Loading</h2>
              </div>
            ) :
              habits.length === 0 ? (
                <div className={styles.card}>
                  <h2>No undone todos</h2>
                  <p>Consider adding a todo from <a href="/add-todo">here</a></p>
                </div>
              ) : (
                habits.map((habit) => {
                  return (
                    <div className={styles.card} key={habit.id}>
                      <h2>{habit.data.arguments['title']}</h2>
                      <p>{habit.data.arguments['description']}</p>
                      <div className={styles.cardActions}>
                        <button type="button">Mark as done</button>
                        <button type="button">Delete</button>
                      </div>
                    </div>
                  )
                })
              )
          }
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="#"
          rel="noopener noreferrer"
        >
          Todos app
        </a>
      </footer>
    </div>
  )
}

export default Home
