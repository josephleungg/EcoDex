import Navbar from '../components/navbar';

export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <main>{children}</main>
          <Navbar />
        </body>
      </html>
    );
  }