import InitialTemplate from "@/components/template/InitialTemplate";

interface PricingSectionSection {
  template: {
    title: string;
    desc: string;
  };
}

const PricingSection: React.FC<PricingSectionSection> = ({ template }) => {
  return <InitialTemplate decs={template.desc} title={template.title} />;
};

export default PricingSection;
