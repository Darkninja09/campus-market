import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "Campus Market",
  description: "A marketplace for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="d-flex flex-column min-vh-100">
      <body>
        <Navbar />
        <main className="container py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
