import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Complex Next App',
  description: 'A multi-page app for testing',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: '2rem' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
