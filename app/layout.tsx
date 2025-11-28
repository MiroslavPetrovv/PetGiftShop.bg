// import type { Metadata } from "next";
// import "./globals.css";
// import { Navbar } from "@/components/navbar";

// export const metadata: Metadata = {
//   title: "MyStore",
//   description: "Buy cool products",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="flex min-h-full flex-col bg-white">
//         <Navbar />
//         <main className="flex-grow container mx-auto px-4 py-8">
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "PetGiftShop",
  description: "Custom Pet Gifts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
