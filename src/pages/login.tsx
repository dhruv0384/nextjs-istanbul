'use client';

import { useGlobalStore } from '../store/useGlobalStore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const setUsername = useGlobalStore((s) => s.setUsername);
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (input.trim().length < 3) {
      toast.error('Username must be at least 3 characters long');
      return;
    }
    setUsername(input);
    toast.success('Logged in successfully!');
    setTimeout(() => router.push('/admin'), 1000);
  };

  return (
    <div>
      <h1>Login</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your username" />
      <button onClick={handleLogin}>Login</button>
      <ToastContainer />
    </div>
  );
}
