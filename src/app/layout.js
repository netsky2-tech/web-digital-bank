"use client";
import dotenv from "dotenv";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Spinner from "@/components/Spinner";
import { AccountsProvider } from "@/contexts/AccountsContext";
import "./globals.css";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";

dotenv.config();

export default function RootLayout({ children }) {
  const { loading } = useLoading();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Web Digital Bank</title>
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 p-6 bg-gray-50">
            <LoadingProvider>
              <AccountsProvider>
                <main className="flex-1 p-6">{children}</main>
              </AccountsProvider>
            </LoadingProvider>
          </div>
          <Footer />
        </div>
        {loading && <Spinner />}
      </body>
    </html>
  );
}
