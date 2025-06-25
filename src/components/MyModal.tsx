import React from 'react';
import { Button } from '@/components/ui/button';

export function MyModal({ open, onClose }: { open: boolean; onClose(): void }) {
  if (!open) return null;
  return (
    <div data-testid="my-modal" className="modal-overlay">
      <div className="modal-content">
        <h2>My Fancy Modal</h2>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
