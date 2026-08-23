import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hamiz Khan — Editor for documentaries and technical videos",
  description:
    "4+ years editing long-form documentary and AI/ML research videos for international YouTube creators. Top Rated on Upwork with 100% JSS.",
  openGraph: {
    title: "Hamiz Khan — Editor for documentaries and technical videos",
    description:
      "4+ years editing long-form documentary and AI/ML research videos for international YouTube creators. Top Rated on Upwork with 100% JSS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className={`${archivo.className} flex min-h-full flex-col font-light`}>
        {children}
      </body>
    </html>
  );
}
