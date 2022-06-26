import * as React from "react";

import AuthSocialButton from "./AuthSocialButton";

interface AuthSocialButtonGroupProps {
  currentPath?: string;
}

const AuthSocialButtonGroup = ({ currentPath }: AuthSocialButtonGroupProps) => {
  return (
    <div className='px-1'>
      <AuthSocialButton
        provider='github'
        tabIndex={4}
        currentPath={currentPath}
      />
      <AuthSocialButton
        provider='google'
        tabIndex={5}
        currentPath={currentPath}
      />
    </div>
  );
};

export default AuthSocialButtonGroup;
