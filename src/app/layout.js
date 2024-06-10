import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yuto Motohashi | 本橋悠人",
  description: "Official webpage of Yuto Motohashi. Discover the work of Yuto Motohashi, a quantum engineer specializing in trapped ion quantum computers. Learn about my research, publications, and contributions to quantum computing. | 本橋悠人の公式ウェブサイトです。イオントラップ方式の量子コンピュータを専門とする量子エンジニアです。研究内容、発表論文をご覧ください",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
