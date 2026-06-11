import InitialTemplate from "@/components/template/InitialTemplate";

interface BlogSectionProps {
  template: {
    title: string;
    desc: string;
  };
}

const BlogSection: React.FC<BlogSectionProps> = ({ template }) => {
  return (
    <section className="w-full min-h-screen">
      <InitialTemplate decs={template.desc} title={template.title} />
    </section>
  );
};

export default BlogSection;
