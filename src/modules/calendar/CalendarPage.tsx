'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useMemo } from 'react';
// import { getUserLocale } from '../lib/analytics'; // hypothetical dead import

const CalendarModal = dynamic(() => import('./components/CalendarModal'), {
  ssr: false,
  loading: () => <p>Loading modal...</p>,
});

const Assistant = () => (
  <div className="p-4 bg-blue-100 rounded-md mt-4">🤖 Hi! I’m your Calendar Assistant. Ask me anything!</div>
);

// Unused complex function (dead code)
export function getZodiacFromDate(date: Date): string {
  return 'Aries';
}

// Enum + switch with unhandled case (dead code)
enum CalendarType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

function calendarLabel(type: CalendarType) {
  switch (type) {
    case CalendarType.DAILY:
      return 'Daily Calendar';
    case CalendarType.WEEKLY:
      return 'Weekly Calendar';
    // MONTHLY is unhandled
  }
}

// Custom hook with branching + unused state
function useCalendarData() {
  const [events] = useState(() => []); // unused state
  const [calendarType] = useState<CalendarType>(CalendarType.WEEKLY);

  useEffect(() => {
    if (calendarType === CalendarType.WEEKLY) {
      console.log('Weekly view loaded');
    }
  }, [calendarType]);

  return { dataLoaded: true };
}

export default function CalendarPage() {
  const { dataLoaded } = useCalendarData();
  const [showAssistant, setShowAssistant] = useState(false);

  const complexUser = useMemo(() => {
    return {
      name: 'Dhruv',
      settings: {
        theme: 'dark',
        calendar: {
          timezone: 'Asia/Kolkata',
        },
      },
    };
  }, []);

  const timezone = complexUser?.settings?.calendar?.timezone ?? 'UTC';

  useEffect(() => {
    console.log('Calendar Page mounted. Timezone:', timezone);
  }, [timezone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">Calendar Page</h1>
      <p className="text-sm text-muted-foreground mb-4">Timezone: {timezone}</p>

      <CalendarModal />

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowAssistant(prev => !prev)}
      >
        {showAssistant ? 'Hide' : 'Show'} Assistant
      </button>

      {showAssistant && <Assistant />}
    </div>
  );
}
