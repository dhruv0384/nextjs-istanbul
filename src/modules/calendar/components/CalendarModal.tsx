'use client';

import { useState } from 'react';

const CalendarModal = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div style={{ border: '1px solid black', padding: 20 }}>
      <h2>Calendar Modal</h2>
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  );
};

export default CalendarModal;