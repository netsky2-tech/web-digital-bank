import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import { AccountsProvider } from "@/contexts/AccountsContext";
import "./globals.css";


export const metadata = {
  title: "Web Digital Bank",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="">
            <AccountsProvider>
              <main className="flex-1 p-6">{children}</main>
            </AccountsProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
