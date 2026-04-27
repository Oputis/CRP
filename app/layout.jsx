import './globals.css';

export const metadata = {
  title: 'CreditPro',
  description: 'Credit repair workflow automation platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
