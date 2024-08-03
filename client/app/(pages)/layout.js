export default function RootLayout({ children }) {
    return (
      <html>
        <body>
          <main>{children}</main>
        </body>
      </html>
    );
  }