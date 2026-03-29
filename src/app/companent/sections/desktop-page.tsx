import About from "../about/desktop";
import ProductsSection from "../product/desktop";
import AchievementsSection from "../AchievementsSection/desktop/AchievementsSection";
import Footer from "../home/desktop/Footer/footer";
import HomeSection from "../home/desktop";

export default function DesktopPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div>
        <HomeSection />
        <About />
        <ProductsSection />
        <div className="h-[20vh] bg-white" />
        <AchievementsSection />
        <Footer />
      </div>
    </main>
  );
}