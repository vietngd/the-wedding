import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://cinelove.me'), // Modify to the real domain if different
  title: "Thiệp Cưới - Đức Việt & Thoa Nguyễn",
  description:
    "Hân hoan thông báo lễ cưới của Đức Việt & Thoa Nguyễn. Chúng tôi trân trọng kính mời bạn đến chung vui.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">❤️</text></svg>',
  },
  openGraph: {
    title: "Thiệp Cưới - Đức Việt & Thoa Nguyễn",
    description: "Hân hoan thông báo lễ cưới của Đức Việt & Thoa Nguyễn. Chúng tôi trân trọng kính mời bạn đến chung vui.",
    url: "/",
    siteName: "Thiệp Cưới",
    images: [
      {
        url: "/images/wedding/wedding-1.jpg", // Using one of the wedding images
        width: 1200,
        height: 630,
        alt: "Thiệp Cưới - Đức Việt & Thoa Nguyễn",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiệp Cưới - Đức Việt & Thoa Nguyễn",
    description: "Hân hoan thông báo lễ cưới của Đức Việt & Thoa Nguyễn. Chúng tôi trân trọng kính mời bạn đến chung vui.",
    images: ["/images/wedding/wedding-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
