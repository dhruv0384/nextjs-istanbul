'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface FeedbackItem {
  id: string;
  user: string;
  message: string;
  rating: number;
  date: string;
}

interface FeedbackModalProps {
  feedback: FeedbackItem[];
}

export default function FeedbackModal({ feedback }: FeedbackModalProps) {
  if (!feedback || feedback.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Feedback Found</AlertTitle>
        <AlertDescription>There is currently no feedback available to display.</AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      {feedback.map(fb => (
        <div key={fb.id} className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium text-foreground">{fb.user}</div>
            <Badge variant="outline">{fb.rating}/5</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{fb.message}</p>
          <div className="text-xs text-muted mt-1">{new Date(fb.date).toLocaleString()}</div>
          <Separator className="my-3" />
        </div>
      ))}
    </ScrollArea>
  );
}
