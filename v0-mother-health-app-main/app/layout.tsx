import type { Metadata } from "next";
import "./globals.css";
import AuthWrapper from "@/components/auth-wrapper";

export const metadata: Metadata = {
  title: "FamilyHealth - Santé Mentale & Nutrition",
  description: "Plateforme holistique pour la santé mentale et nutritionnelle des enfants",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
