import InitialTemplate from "@/components/template/InitialTemplate";

interface ResourceHeroSectionProps {
  template: {
    title: string;
    desc: string;
  };
}

const ResourceHeroSection: React.FC<ResourceHeroSectionProps> = ({
  template,
}) => {
  return (
    <section className="w-full min-h-screen">
      <InitialTemplate decs={template.desc} title={template.title} />
    </section>
  );
};

export default ResourceHeroSection;
