import * as React from 'react';
import GithubIcon from '../../static/svg/github-icon';
import GoogleIcon from '../../static/svg/google-icon';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AuthSocialButtonProps {
  provider: 'google' | 'github';
  tabIndex?: number;
  currentPath?: string;
}

const providerMap = {
  github: {
    color: '#272e33',
    icon: GithubIcon,
    border: false,
  },
  google: {
    color: 'white',
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
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_HOST
      : 'http://localhost:5000/';

  const redirectTo = `${host}api/v2/auth/social/redirect/${provider}?next=${currentPath}`;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.8 }}
        className="flex bg-white rounded text-[#202630] border-[1px] h-12  justify-center items-center  mt-4 cursor-pointer  font-lato font-semibold"
        tabIndex={tabIndex}>
        <div className="px-4">
          <Icon />
        </div>
        Continue with Github
      </motion.div>
    </>
  );
};

export default AuthSocialButton;
