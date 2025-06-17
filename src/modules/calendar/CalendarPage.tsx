'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Head from 'next/head'; // unused import

const CalendarModal = dynamic(() => import('./components/CalendarModal'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const CalendarPage = () => {
  useEffect(() => {
    console.log('Calendar Page mounted');
  }, []);

  return (
    <div>
      <h1>Calendar Page</h1>
      <CalendarModal />
    </div>
  );
};

export default CalendarPage;