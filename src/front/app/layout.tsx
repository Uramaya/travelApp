import { ReduxProvider } from "@/stores/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/mui/index.scss"
import "@/styles/icon/index.scss"
import '@/styles/page.scss'

import GlobalHeader from "@/components/common/GlobalHeader"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Mundo - My Travel Itinerary App",
  description: "Travel Itinerary Route planning app ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalHeader />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
