import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'] 
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode; }>) {


  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
