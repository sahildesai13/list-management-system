import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hari Om",
  description: "Hari Om Size Guide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>
          <Provider>{children}</Provider>
        </LayoutClient>
      </body>
    </html>
  );
}
