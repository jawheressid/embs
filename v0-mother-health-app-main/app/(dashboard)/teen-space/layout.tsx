import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Ado - Bloom Sanctuary",
  description: "Un espace sûr pour explorer tes émotions et grandir.",
};

export default function TeenSpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
