'use client';

import { useFeedbackData } from './hooks/useFeedbackData';
import dynamic from 'next/dynamic';

const FeedbackModal = dynamic(() => import('./components/FeedbackModal'));

export default function CFMDashboard() {
  const { feedback } = useFeedbackData();

  return (
    <div>
      <h1>Customer Feedback Dashboard</h1>
      <FeedbackModal feedback={feedback} />
    </div>
  );
}
