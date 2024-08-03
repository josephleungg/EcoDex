import Navbar from '../components/navbar';
import Header from '../components/header';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main
          className="min-h-screen bg-[#dbdbdb] py-28"
          style={{
            backgroundImage: 'url(/images/ecodex-leaf-opacity.png)',
            backgroundSize: '80% auto',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}