'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const CalendarModal = dynamic(() => import('./components/CalendarModal'), {
  ssr: false,
  loading: () => <p>Loading modal...</p>,
});

export default function CalendarPage() {
  useEffect(() => {
    console.log('Calendar Page mounted');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">Calendar Page</h1>
      <CalendarModal />
    </div>
  );
}
