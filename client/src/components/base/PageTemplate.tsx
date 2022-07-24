import FloatingHeader from './FloatingHeader';
import Header from './Header';

export type PageTemplateProps = {
  children: React.ReactNode;
};

function PageTemplate({ children }: PageTemplateProps) {
  return (
    <>
      <Header />
      <FloatingHeader />
      {children}
    </>
  );
}

export default PageTemplate;
