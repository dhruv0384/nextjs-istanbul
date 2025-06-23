'use client';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  timestamp: string;
}

export default function Admin({ timestamp }: Props) {
  return (
    <>
      <Head>
        <title>Admin Panel | Dashboard</title>
        <meta name="description" content="Admin panel for viewing real-time server data" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background p-6">
        <Card className="max-w-md w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">Current Server Time:</p>
            <p className="text-lg font-mono">{timestamp}</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
  };
};
