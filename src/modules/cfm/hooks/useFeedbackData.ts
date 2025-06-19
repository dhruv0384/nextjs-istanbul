'use client';

import { useEffect, useState } from 'react';

interface FeedbackItem {
  id: string;
  user: string;
  message: string;
  rating: number;
  date: string;
}

export const useFeedbackData = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    // Simulate fetching structured feedback
    setTimeout(() => {
      setFeedback([
        {
          id: '1',
          user: 'Alice',
          message: 'Great app!',
          rating: 5,
          date: new Date().toISOString(),
        },
        {
          id: '2',
          user: 'Bob',
          message: 'Could be better',
          rating: 3,
          date: new Date().toISOString(),
        },
        {
          id: '3',
          user: 'Charlie',
          message: 'Love the UI',
          rating: 4,
          date: new Date().toISOString(),
        },
      ]);
    }, 1000);
  }, []);

  return { feedback };
};
