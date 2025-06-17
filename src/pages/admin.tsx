import { GetServerSideProps } from 'next';

interface Props {
  timestamp: string;
}

export default function Admin({ timestamp }: Props) {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Current Server Time: {timestamp}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
  };
};
