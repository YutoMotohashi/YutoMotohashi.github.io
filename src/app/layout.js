import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yuto Motohashi | 本橋悠人",
  description: "Official webpage of Yuto Motohashi | 本橋悠人の公式ウェブサイトです",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
