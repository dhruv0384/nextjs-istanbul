'use client';

import { useFeedbackData } from './hooks/useFeedbackData';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const FeedbackModal = dynamic(() => import('./components/FeedbackModal'));

export default function CFMDashboard() {
  const { feedback } = useFeedbackData();
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Customer Feedback Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="raw-toggle">Show raw feedback</Label>
            <Switch id="raw-toggle" checked={showRaw} onCheckedChange={setShowRaw} />
          </div>

          {showRaw && (
            <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
              {JSON.stringify(feedback, null, 2)}
            </pre>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">View Feedback Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h3 className="text-lg font-semibold">Feedback Summary</h3>
              </DialogHeader>
              <FeedbackModal feedback={feedback}/>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
