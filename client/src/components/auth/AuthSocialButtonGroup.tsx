import * as React from 'react';
import Link from 'next/link';
import AuthSocialButton from './AuthSocialButton';

interface AuthSocialButtonGroupProps {
  currentPath?: string;
}

const AuthSocialButtonGroup = ({ currentPath }: AuthSocialButtonGroupProps) => {
  console.log(process.env.REACT_APP_API_HOST!);
  return (
    <div className="px-1">
      <Link href={process.env.REACT_APP_API_HOST!} passHref={true}>
        <a>
          <AuthSocialButton provider="github" tabIndex={4} currentPath={currentPath} />
        </a>
      </Link>
      {/* <AuthSocialButton provider="google" tabIndex={5} currentPath={currentPath} /> */}
    </div>
  );
};

export default AuthSocialButtonGroup;
