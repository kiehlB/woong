import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiMail } from 'react-icons/fi';
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si';
import { Tooltip } from 'react-tippy';
import Accent from './Accent';
import UnstyledLink from './UnstyledLink';

export default function Footer() {
  return (
    <footer className="pb-2">
      <main className="layout flex flex-col items-center pt-6 border-t dark:border-gray-600">
        <FooterLinks />

        <p className="mt-12 font-medium text-gray-600 dark:text-gray-300">Reach me out</p>
        <SocialLinks />

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
          © WoongBlog {new Date().getFullYear()}
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className="flex flex-wrap gap-y-4 gap-x-8 justify-center">
      {footerLinks.map(({ href, text, id }) => (
        <UnstyledLink
          key={id}
          className="animated-underline text-sm font-medium rounded-sm dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
          href={href}>
          {text}
        </UnstyledLink>
      ))}
    </div>
  );
}

function SocialLinks() {
  const [copyStatus, setCopyStatus] = React.useState('Click the mail logo to copy');

  return (
    <div className="flex mt-2 space-x-4">
      <div className="flex justify-center items-center">
        <Tooltip
          trigger="mouseenter"
          hideOnClick={false}
          interactive
          html={
            <div className="inline-block p-2 text-gray-600 bg-white rounded-md border shadow-md dark:bg-dark dark:text-gray-200 dark:border-gray-600">
              {copyStatus}
              <Accent className="inline-block font-medium"></Accent>
            </div>
          }>
          <CopyToClipboard
            text="thekiehlb@gmail.com"
            onCopy={() => {
              setCopyStatus('Copied to clipboard 🥳');
              setTimeout(() => setCopyStatus('Click the mail logo to copy'), 1500);
            }}>
            <button className="align-middle rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300">
              <FiMail className="w-7 h-7 text-gray-600 align-middle dark:hover:text-primary-300 dark:text-gray-300 hover:text-primary-300" />
            </button>
          </CopyToClipboard>
        </Tooltip>
      </div>
      {socials.map(social => (
        <UnstyledLink
          key={social.text}
          className="inline-flex justify-center items-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
          href={social.href}>
          <social.icon className="my-auto w-6 h-6 text-gray-600 align-middle transition-colors dark:hover:text-primary-300 dark:text-gray-300 hover:text-primary-300" />
        </UnstyledLink>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    id: 1,
    href: '/',
    text: 'Docs',
  },
  {
    id: 2,
    href: './',
    text: 'Book Notes',
  },
  {
    id: 3,
    href: './',
    text: 'Polywork',
  },
  {
    id: 4,
    href: './',
    text: 'Starter Templates',
  },
  {
    id: 5,
    href: '/',
    text: 'Statistics',
  },
  {
    id: 6,
    href: '/',
    text: 'Guestbook',
  },
];

const socials = [
  {
    href: 'https://github.com/kiehlb',
    icon: SiGithub,
    text: 'Github',
  },
  {
    href: '/',
    icon: SiLinkedin,
    text: 'Linkedin',
  },
  {
    href: '/',
    icon: SiTwitter,
    text: 'Twitter',
  },
];
