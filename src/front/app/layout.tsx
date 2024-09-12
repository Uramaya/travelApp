"use client"
import { ReduxProvider } from "@/stores/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/mui/index.scss"
import "@/styles/icon/index.scss"
import '@/styles/page.scss'

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "El Mundo - My Travel Itinerary App",
//   description: "Travel Itinerary Route planning app ",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        async
        defer
      ></script>
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
