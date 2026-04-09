import "./globals.css";
import type { Metadata } from "next";
import { AuthModalProvider } from "./companent/shared/auth/AuthModalProvider";
import { getPublicSiteSnapshot } from "@/lib/backend/public-api-source";
import { selectMediaAsset } from "@/lib/backend/selectors";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const snapshot = await getPublicSiteSnapshot();
    const favicon = selectMediaAsset(snapshot, snapshot.siteIdentity.faviconAssetId);

    return {
      title: snapshot.siteIdentity.siteName,
      description: snapshot.siteIdentity.tagline,
      icons: favicon?.url
        ? {
            icon: favicon.url,
            shortcut: favicon.url,
            apple: favicon.url,
          }
        : undefined,
    };
  } catch {
    return {
      title: "Azizam Market",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <AuthModalProvider>{children}</AuthModalProvider>
      </body>
    </html>
  );
}
