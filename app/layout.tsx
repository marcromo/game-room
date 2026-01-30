import type { Metadata } from "next";
import "./globals.css";
import { UserStatus } from "@/components/UserStatus";

export const metadata: Metadata = {
  title: "Game Room",
  description: "Frontend for Game Room API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="w-full flex justify-end p-4">
          <UserStatus />
        </div>
        {children}
      </body>
    </html>
  );
}
