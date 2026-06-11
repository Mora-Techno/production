import NavLayout from "@/core/layouts/nav.layout";
import PricingSection from "@/components/page/public/pricing/HeroSection";

const PricingContainer = () => {
  return (
    <NavLayout>
      <main className="w-full min-h-screen">
        <PricingSection
          template={{
            desc: "Initial Pricing",
            title: "Pricing",
          }}
        />
      </main>
    </NavLayout>
  );
};

export default PricingContainer;
