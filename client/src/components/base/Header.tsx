import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md';
import { AiOutlineGlobal } from 'react-icons/ai';
import Link from 'next/link';
import HeaderMenuItems from './HeaderMenuItem';
import HeaderTopicItem from './HeaderTopicItem';
import ReactIcon from '../../static/svg/react-icon';
import NodeIcon from '../../static/svg/node-icon';
import JavascriptIcon from '../../static/svg/javascript-icon';
import CssIcon from '../../static/svg/css-icon';
import LogoIcon from '../../static/svg/logo-icon';
import MenuIcon from '../../static/svg/menu-icon';
import ArrowDownIcon from '../../static/svg/arrowDown-icon';
import useGetUser from '../auth/hooks/useWhoAmI';
import useGetTags from '../../view/home/hooks/usegetTags';

export type HeaderProps = {
  tag: any;
};

const MenuItems = [
  {
    id: 10000,
    name: 'React',
    subName: 'A JavaScript library for building user interfaces',
    svg: <ReactIcon />,
  },
  {
    id: 10001,
    name: 'Node Js',
    subName: 'JavaScript runtime built on Chrome V8 JavaScript engine.',
    svg: <NodeIcon />,
  },
  {
    id: 10002,
    name: 'Javascript',
    subName: 'just-in-time compiled programming language with first-class functions',
    svg: <JavascriptIcon />,
  },
  {
    id: 10004,
    name: 'Css',
    subName:
      'stylesheet language used to describe the presentation of a document written in HTML or XML',
    svg: <CssIcon />,
  },
];

function Header({ tag }: HeaderProps) {
  const { loading, error, getUser, logoutButton } = useGetUser();

  const mergeTag = MenuItems.concat(tag?.getAllTags);
  if (loading) return <div>Loading</div>;
 

  return (
    <div className="flex items-center h-16 bg-[#0B0E11] text-white pr-6 pl-6 justify-between ">
      <div className="flex items-center">
        <Link href="/">
          <div className="cursor-pointer flex items-center">
            <LogoIcon />
          </div>
        </Link>

        <div className="flex items-center mxl:hidden">
          <div className="group w-6  mr-8 ml-8">
            <MenuIcon />
            <nav className="absolute mt-5 bg-white">
              <div className="group-hover:block  hidden  relative  shadow  border-b-2   text-black after:border-[12px]   after:border-solid after:border-transparent after:border-b-white after:-top-[20px] after:absolute after:left-1.5 ">
                <ul className="grid grid-cols-2 p-4">
                  {MenuItems.map(e => (
                    <li key={e.id}>
                      <HeaderMenuItems {...e} />
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="mr-8">
            <Link href="/filter">
              <div className="cursor-pointer">
                <a className="link_a">
                  <svg className="icon-arrow before">
                    <use xlinkHref="#arrow" />
                  </svg>
                  <span className="label  font-Cabin  font-medium">See All Posts</span>
                  <svg className="icon-arrow after">
                    <use xlinkHref="#arrow" />
                  </svg>
                </a>
                <svg style={{ display: 'none' }}>
                  <defs>
                    <symbol id="arrow" viewBox="0 0 35 15">
                      <title>Arrow</title>
                      <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z " />
                    </symbol>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>

          <div className="group">
            <div className="flex items-center">
              <div className="mr-2 font-Cabin  font-medium">Tags</div>
              <ArrowDownIcon />
            </div>
            <nav className="absolute mt-5 bg-white  z-[99999]">
              <div className="group-hover:block  hidden  relative  shadow  border-b-2   text-black after:border-[12px]   after:border-solid after:border-transparent after:border-b-white after:-top-[20px] after:absolute after:left-1.5 ">
                <ul className="grid grid-cols-3  pl-4 pr-4  pt-4 mb-2">
                  {mergeTag?.map(e => (
                    <li key={e?.id}>
                      <HeaderTopicItem {...e} />
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <div className="ml-8  font-Cabin  font-medium cursor-pointer">Glossaries</div>
        </div>
      </div>

      <div className="flex flex-end items-center">
        <div className="search">
          <input type="text" className="input" />
          <div className="close">
            <span className="front" />
            <span className="back" />
          </div>
        </div>

        <Link href="/signin">
          <div className="ml-8 mxl:hidden text-sm  cursor-pointer  font-Cabin  font-medium">
            {!loading && getUser?.whoAmI?.ok ? '' : 'Login'}
          </div>
        </Link>
        <Link href="/signup">
          <div
            className="flex cursor-pointer  text-sm items-center ml-8 mxl:hidden text-black px-4  rounded h-8  font-Cabin  font-medium "
            style={{
              backgroundImage:
                'linear-gradient(rgb(248, 209, 47) 0%, rgb(240, 185, 11) 100%)',
            }}>
            {!loading && getUser?.whoAmI?.ok ? 'Logout' : 'Register'}
          </div>
        </Link>
        <div className="ml-8 mxl:hidden">
          <MdOutlineDarkMode size="25" />
        </div>
        <div className="ml-8 mxl:hidden">
          <AiOutlineGlobal size="25" />
        </div>
      </div>
    </div>
  );
}

export default Header;
