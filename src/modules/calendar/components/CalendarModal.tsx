'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

export default function CalendarModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Calendar Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calendar Event</DialogTitle>
        </DialogHeader>
        <div>
          <p>This is the modal content — You have an upcoming event.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
