import Navbar from '../components/navbar';
import Header from '../components/header';

export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <Header />
            <main className="min-h-screen bg-[#dbdbdb] pt-28 pb-20">{children}</main>
          <Navbar />
        </body>
      </html>
    );
  }