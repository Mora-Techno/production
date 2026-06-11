interface InitialTemplateProps {
  title: string;
  decs: string;
}

const InitialTemplate: React.FC<InitialTemplateProps> = ({ decs, title }) => {
  return (
    <div className="landing-dark min-h-screen bg-background pt-24 ">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-400">{decs}</p>
      </div>
    </div>
  );
};

export default InitialTemplate;
