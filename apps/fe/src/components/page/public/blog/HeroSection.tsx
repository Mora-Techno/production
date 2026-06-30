import { GhibliEmptyState } from '@/components/molecules';
interface BlogSectionProps {
  template: {
    title: string;
    desc: string;
  };
}

const BlogSection: React.FC<BlogSectionProps> = ({ template }) => {
  return (
    <section className="w-full min-h-screen">
      <GhibliEmptyState description={template.desc} title={template.title} />
    </section>
  );
};

export default BlogSection;
