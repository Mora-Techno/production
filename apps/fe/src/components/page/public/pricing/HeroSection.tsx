import { GhibliEmptyState } from "@/components/molecules";

interface PricingSectionSection {
  template: {
    title: string;
    desc: string;
  };
}

const PricingSection: React.FC<PricingSectionSection> = ({ template }) => {
  return (
    <GhibliEmptyState description={template.desc} title={template.title} />
  );
};

export default PricingSection;
