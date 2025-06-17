'use client';

interface Props {
  feedback: string[];
}

export default function FeedbackModal({ feedback }: Props) {
  return (
    <div style={{ border: '1px solid green', padding: 20 }}>
      <h2>User Feedback</h2>
      <ul>
        {feedback.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
    </div>
  );
}