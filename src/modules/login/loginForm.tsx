'use client';

import { useGlobalStore } from '@/store/useGlobalStore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const setUsername = useGlobalStore(s => s.setUsername);
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (input.trim().length < 3) {
      toast.error('Username must be at least 3 characters long');
      return;
    }
    setUsername(input);
    toast.success('Logged in successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your username" />
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
