import PublicSiteContentProvider from "./companent/shared/content/PublicSiteContentProvider";
import ResponsivePage from "./companent/shared/responsive/ResponsivePage";
import { localPublicSiteContentService } from "@/lib/backend/local-source";

export default async function Page() {
  const snapshot = await localPublicSiteContentService.getPublicSiteSnapshot();

  return (
    <PublicSiteContentProvider snapshot={snapshot}>
      <ResponsivePage />
    </PublicSiteContentProvider>
  );
}
