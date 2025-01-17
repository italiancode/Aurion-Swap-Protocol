import { Cinzel, Quicksand } from "next/font/google";
import { ClientRoot } from "@/root/ClientRoot";
import "./globals.css";

// import "@/utils/connection/connection";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans min-h-screen bg-[#0d1117] flex flex-col relative overflow-x-hidden font-bold`}
      >
        <div className="relative z-10 flex flex-col">
          <ClientRoot>{children}</ClientRoot>
        </div>
      </body>
    </html>
  );
}
