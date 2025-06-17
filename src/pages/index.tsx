'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import { APP_NAME } from '../constants';
import { logPageVisit } from '../lib/analytics';

const LazyMessage = dynamic(() => import('./../components/LazyMessage'), {
  loading: () => <p>Loading message...</p>,
});

export default function Home() {
  const [visits, setVisits] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    logPageVisit('Home');
    const stored = localStorage.getItem('visits');
    const current = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem('visits', current.toString());
    setVisits(current);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{APP_NAME} Dashboard</title>
      </Head>
      <main className={styles.main}>
        <h1>Welcome to the Next App</h1>
        <p>You have visited this page {visits} times.</p>
        {/* Button to trigger LazyMessage load */}
        <button onClick={() => setShowMessage(true)}>
          Show Lazy Message
        </button>

        {/* Conditional rendering of LazyMessage */}
        {showMessage && <LazyMessage />}
        <nav>
          <ul>
            <li><Link href="/calendar">Calendar Page</Link></li>
            <li><Link href="/cfm">Customer Feedback</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
      </main>
    </div>
  );
}


//  "cfm": [src/modules/]