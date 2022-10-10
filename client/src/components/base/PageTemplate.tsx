import Footer from '../footer';
import FloatingHeader from './FloatingHeader';
import Header, { MainTag } from './Header';

export type PageTemplateProps = {
  children: React.ReactNode;
  tag: {
    getAllTags: MainTag | ConcatArray<MainTag>;
  };
  loading?: boolean;
};

function PageTemplate({ children, tag, loading }: PageTemplateProps) {
  return (
    <div className="flex felx-col min-h-screen">
      <div className="flex flex-col flex-1 h-full">
        <Header tag={tag} loading={loading} />
        {/* <FloatingHeader tag={tag} loading={loading} /> */}
        {children}
        <div className="mt-auto">
          <Footer />
        </div>
        <style global jsx>{`
          html,
          body {
            height: 100%;
          }
        `}</style>
      </div>
    </div>
  );
}

export default PageTemplate;
