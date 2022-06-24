import * as React from "react";
import GithubIcon from "../../static/svg/github-icon";
import GoogleIcon from "../../static/svg/google-icon";

interface AuthSocialButtonProps {
  provider: "google" | "github";
  tabIndex?: number;
  currentPath?: string;
}

const providerMap = {
  github: {
    color: "#272e33",
    icon: GithubIcon,
    border: false,
  },
  google: {
    color: "white",
    icon: GoogleIcon,
    border: true,
  },
};

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  provider,
  tabIndex,
  currentPath,
}) => {
  const info = providerMap[provider];
  const { icon: Icon, color, border } = info;

  const host =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_HOST
      : "http://localhost:5000/";

  const redirectTo = `${host}api/v2/auth/social/redirect/${provider}?next=${currentPath}`;

  return (
    <>
      <div
        className='flex bg-white rounded text-[#202630] border-[1px] h-12 w-[24rem] justify-center items-center font-medium '
        tabIndex={tabIndex}
      >
        <div className='px-4'>
          <Icon />
        </div>
        Continue with Github
      </div>
    </>
  );
};

export default AuthSocialButton;
