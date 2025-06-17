'use client';

import { useEffect, useState } from 'react';

export const useFeedbackData = () => {
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    // simulate fetching feedback
    setTimeout(() => {
      setFeedback(['Great app!', 'Could be better', 'Love the UI']);
    }, 1000);
  }, []);

  return { feedback };
};