import '@/styles/globals.css'; // ✅ This brings in Tailwind styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
