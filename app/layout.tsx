import type { Metadata, Viewport } from "next";
import { business } from "@/lib/business";
import "./globals.css";
const title = "Veena Enterprises — Solar Installation & Services in Jaipur";
const description =
  "Solar panel installation, on-grid and off-grid systems, inverters, batteries and maintenance in Jaipur. Talk to Veena Enterprises about your solar project.";
export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: title, template: "%s | Veena Enterprises" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: business.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Veena Enterprises — Go solar, save money, save the planet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon-180.png",
  },
  manifest: "/manifest.json",
};
export const viewport: Viewport = { themeColor: "#2968aa" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: business.url,
    image: `${business.url}/og-image.jpg`,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "57, Govind Nagar West, Amer Road",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Jaipur" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
