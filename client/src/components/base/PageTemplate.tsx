import Footer from '../footer';
import FloatingHeader from './FloatingHeader';
import Header from './Header';

export type PageTemplateProps = {
  children: React.ReactNode;
  tag?: any;
};

function PageTemplate({ children, tag }: PageTemplateProps) {
  return (
    <div className="flex felx-col  min-h-screen">
      <div className="flex flex-col flex-1">
        <Header tag={tag} />
        {/* <FloatingHeader /> */}
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
