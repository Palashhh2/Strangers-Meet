import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strangers Meet",
  description: "AI-curated dinner experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundImage: "url('/bg-home.svg')" }}>
        <Navbar />

        <main className="max-w-5xl mx-auto px-6 animate-fade-in">{children}</main>
      </body>
    </html>
  );
}
