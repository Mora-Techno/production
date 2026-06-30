import { GhibliEmptyState } from '@/components/molecules';

interface ResourceHeroSectionProps {
  template: {
    title: string;
    desc: string;
  };
}

const ResourceHeroSection: React.FC<ResourceHeroSectionProps> = ({ template }) => {
  return (
    <section className="w-full min-h-screen  ">
      <GhibliEmptyState title={template.title} description={template.desc} />
    </section>
  );
};

export default ResourceHeroSection;
