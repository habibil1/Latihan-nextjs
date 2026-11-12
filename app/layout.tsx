import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700" },
  ],
});
export const metadata: Metadata = {
  title: "EventKu",
  description: "Katalog dan pemesanan tiket event sekolah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="antialiased">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</main>
        <footer className="border-t bg-white p-4 text-center text-sm text-slate-500">
          EventKu &bull; dibuat di kelas Junior Web Developer
        </footer>
      </body>
    </html>
  );
}
