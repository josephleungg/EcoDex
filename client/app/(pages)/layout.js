import Header from "../components/header";
export default function RootLayout({ children }) {
    return (
      <html>
        <body>
        <Header />
          <main>{children}</main>
        </body>
      </html>
    );
  }