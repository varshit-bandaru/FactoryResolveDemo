import "./globals.css";

export const metadata = {
  title: "FactoryResolve | Incident workflow demo",
  description: "An interactive FactoryResolve workflow demo for Apex Auto Components",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}