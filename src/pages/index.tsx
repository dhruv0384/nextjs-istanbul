'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import { APP_NAME } from '../constants';
import { logPageVisit } from '../lib/analytics';

import { Button } from './../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './../components/ui/card';

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
        <title>Next App Dashboard</title>
      </Head>
      <main className="w-screen h-screen flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-background text-center">
        <Card className="w-full max-w-xl p-6 space-y-4 shadow-xl">
          <h1 className="text-3xl font-bold">Next App Dashboard</h1>
          <p className="text-muted-foreground">
            You have visited this page <strong>{visits}</strong> times.
          </p>

          <Button onClick={() => setShowMessage(true)}>Show Lazy Message</Button>

          {showMessage && <LazyMessage />}

          <CardContent>
            <ul className="space-y-2 pt-4">
              <li>
                <Link className="text-blue-600 hover:underline" href="/calendar">
                  📅 Calendar Page
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/cfm">
                  📝 Customer Feedback
                </Link>
              </li>
              <li>
                <Link className="text-blue-600 hover:underline" href="/login">
                  🔐 Login
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

//  "cfm": [src/modules/]
