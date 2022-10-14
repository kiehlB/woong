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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { tagGet } from '../../store/tag';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { setPostSearch } from '../../store/post';
import { useRouter } from 'next/router';

import Sidebar from '../sidebar/Sidebar';

export type Tags = {
  id: number;
  name: string;
  name_filtered: string;
  updated_at: string;
  __typename: string;
};

export type MainTag = {
  id: number;
  name: string;
  subName: string;
  svg?: React.ReactNode;
};

export type HeaderProps = {
  tag: {
    getAllTags: MainTag | ConcatArray<MainTag>;
  };
  loading: boolean;
};

export const MenuItems: MainTag[] = [
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

function Header({ tag, loading }: HeaderProps) {
  const { loading: userLoading, error, getUser, logoutButton } = useGetUser();

  const router = useRouter();
  const dispatch = useDispatch();
  const globalTag = useSelector((state: RootState) => state?.tag?.tag);
  const Postsearch = useSelector((state: RootState) => state?.post?.search);

  const mergeTag = MenuItems.concat(tag?.getAllTags);

  const handleCheck = name => {
    let updatedList = [...globalTag];

    if (name) {
      updatedList = [...globalTag, name];
    } else {
      updatedList.splice(globalTag.indexOf(name), 1);
    }

    dispatch(tagGet(updatedList));
  };

  const handleChange = useCallback(
    e => {
      const { value } = e.target;
      dispatch(setPostSearch(value));
    },
    [dispatch],
  );

  const mergeTagData = mergeTag.filter(function (element) {
    return element !== undefined;
  });

  const handleSubmit = event => {
    event.preventDefault();

    if (Postsearch !== '') {
      router.push('/filter');
    }
  };

  return (
    <div className="flex items-center h-16 bg-[#0B0E11] text-white pr-6 pl-6 justify-between py-3">
      <div className="flex items-center">
        <Link href="/">
          <div className="cursor-pointer flex items-center mxl:hidden">
            <LogoIcon />
          </div>
        </Link>

        <div className="flex items-center mxl:hidden z-40">
          <div className="group w-6  mr-8 ml-8">
            <MenuIcon />
            <nav className="absolute mt-5 bg-white">
              <div className="group-hover:block pt-2 hidden  relative  shadow  border-b-2 text-black after:border-[12px] after:border-solid after:border-transparent after:border-b-white after:-top-[20px] after:absolute after:left-1.5 ">
                <ul className="grid grid-cols-2 p-4">
                  {MenuItems.map(e => (
                    <li key={e.id}>
                      <HeaderMenuItems {...e} handleCheck={handleCheck} />
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="mr-8">
            <Link href="/filter">
              <a className="cursor-pointer">
                <div className="link_a">
                  <svg className="icon-arrow before">
                    <use xlinkHref="#arrow" />
                  </svg>
                  <span className="label  font-Cabin  font-medium">See All Posts</span>
                  <svg className="icon-arrow after">
                    <use xlinkHref="#arrow" />
                  </svg>
                </div>
                <svg style={{ display: 'none' }}>
                  <defs>
                    <symbol id="arrow" viewBox="0 0 35 15">
                      <title>Arrow</title>
                      <path d="M27.172 5L25 2.828 27.828 0 34.9 7.071l-7.07 7.071L25 11.314 27.314 9H0V5h27.172z " />
                    </symbol>
                  </defs>
                </svg>
              </a>
            </Link>
          </div>

          <div className="group">
            <div className="flex items-center">
              <div className="mr-2 font-Cabin  font-medium">Tags</div>
              <ArrowDownIcon />
            </div>
            <nav className="absolute mt-5 bg-white  z-[99999] w-[30rem]">
              <div className="group-hover:block pt-1  hidden  relative  shadow  border-b-2   text-black after:border-[12px]   after:border-solid after:border-transparent after:border-b-white after:-top-[20px] after:absolute after:left-1.5 ">
                <ul className="grid grid-cols-3  px-4 pt-2 mb-2">
                  {!loading &&
                    mergeTagData?.slice(0, 18).map(e => (
                      <li key={e?.id}>
                        <HeaderTopicItem size="big" {...e} handleCheck={handleCheck} />
                      </li>
                    ))}
                </ul>
              </div>
            </nav>
          </div>
          <div className="ml-8 font-Cabin font-medium cursor-pointer">Glossaries</div>
        </div>
      </div>

      <div className="flex flex-end items-center">
        <div className="lg:hidden">
          <Sidebar />
        </div>

        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            value={Postsearch}
            onChange={handleChange}
          />

          <div className="close">
            <span className="front" />
            <span className="back" />
          </div>
        </form>

        {!loading && getUser?.whoAmI?.ok ? (
          <Link href="/write">
            <div className="flex cursor-pointer text-sm items-center ml-8 mxl:hidden text-white border px-4 rounded h-8 font-Cabin font-medium ">
              <div>Write</div>
            </div>
          </Link>
        ) : (
          ''
        )}

        <Link href="/signin">
          <a>
            <div
              className={clsx(
                'mxl:hidden text-sm cursor-pointer font-Cabin font-medium',
                {
                  'ml-8': getUser?.whoAmI?.ok == undefined,
                },
              )}>
              {!loading && getUser?.whoAmI?.ok ? '' : 'Login'}
            </div>
          </a>
        </Link>
        <Link href="/signup">
          <div
            className="flex cursor-pointer text-sm items-center ml-8 mxl:hidden text-black px-4  rounded h-8  font-Cabin  font-medium "
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
