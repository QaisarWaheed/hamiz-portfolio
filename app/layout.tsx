import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Kanit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} ${kanit.variable} h-full antialiased`}
    >
      <body className={`${kanit.className} min-h-full flex flex-col font-light`}>
        {children}
      </body>
    </html>
  );
}
