import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/base/PageTemplate';
import { Button } from '../../components/common/Button';
import SvgCard from '../../components/common/SvgCard';
import Dot from '../../components/common/TagsDot';
import Main from '../../components/main';
import useGetPosts from '../../components/main/hooks/usegetPosts';
import TagItem from '../../components/tags/TagItem';
import Bicycle from '../../static/svg/bicycle';
import Swing from '../../static/svg/swing';
import { RootState } from '../../store/rootReducer';
import useGetTags from './hooks/usegetTags';
import { Button as NextButton } from '@nextui-org/react';
import TagList from '../../components/tags/TagList';
import { MenuItems } from '../../components/base/Header';
import { getMainTag } from '../../store/tag';
import PostList from '../../components/post/PostList';
import PostTitle from '../../components/post/PostTitle';

const Home: NextPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useGetPosts();

  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  const globalTag = useSelector((state: RootState) => (state as any)?.tag?.mainTag);

  const mergeTag = MenuItems.concat((getTagsData as any)?.getAllTags);

  if (loading) return <div>Loading</div>;

  const filteredArray =
    data?.findAllPost.filter(e =>
      e.posts_tags.map(el => globalTag.includes(el.tag.name)).includes(true),
    ).length == 0
      ? data?.findAllPost
      : data?.findAllPost.filter(e =>
          e.posts_tags.map(el => globalTag.includes(el.tag.name)).includes(true),
        );

  const isFilterdArray = filteredArray ? filteredArray : [];

  return (
    <PageTemplate tag={getTagsData}>
      <Main post={data} />
      <div className="w-[71rem] mx-auto  mxl:w-[80%]">
        <div className="py-[3.5rem]">
          <PostTitle title="Latest Releases" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="">
            <PostList data={data?.findAllPost.slice(0, 9)} />
          </div>
        </div>

        <div className="mb-7">
          <SvgCard svg={<Swing />} />
        </div>

        <div className="py-14">
          <SvgCard svg={<Bicycle />} />
        </div>
      </div>

      <div className="w-[71rem] mx-auto  mxl:w-[80%]">
        <div className="py-[3.5rem]">
          <PostTitle title="Trading" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="">
            <PostList data={data?.findAllPost.slice(0, 3)} />
          </div>
        </div>
      </div>
      <div className="bg-[#14151A]">
        <div className="w-[71rem] mx-auto  mxl:w-[80%]">
          <div className="flex pt-14">
            <div className="text-white">Topics : </div>
            <div className="text-[#aeb4bc] flex flex-1 flex-wrap items-center gap-4 px-4">
              <TagList
                tag={mergeTag}
                globalTag={globalTag}
                toStore={getMainTag}
                size="small"
              />
            </div>
          </div>

          <div className="flex my-8 ">
            <div className="text-white  mr-4">Difficulty:</div>

            <TagItem tag="Begnner" variant="green" size="medium" add={true}>
              <Dot css="bg-[#02C076] w-[6px] h-[6px]" />
            </TagItem>

            <div className="ml-4">
              <TagItem tag="Intermediate" variant="yello" size="medium" add={true}>
                <Dot css="bg-[#f0b90b] w-[6px] h-[6px]" />
              </TagItem>
            </div>

            <div className="ml-4">
              <TagItem tag="Advanced" variant="red" size="medium" add={true}>
                <Dot css="bg-[#d9304e] w-[6px] h-[6px]" />
              </TagItem>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <div
                className="grid bg-[#2b2f36] rounded-lg "
                style={{
                  gridTemplateColumns: 'minmax(auto,368px) 1fr',
                }}>
                <img className="gridImg " />
                <div className="flex text-white bg-[#2b2f36] flex-col  justify-center px-4 rounded-lg">
                  <div className="text-[2rem] leading-10 font-semibold">
                    {isFilterdArray[0]?.title}
                  </div>
                  <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
                    Jul 7, 2022 5m
                  </div>
                  <div className="flex items-center">
                    <Dot css="bg-[#F0B90B]" /> Intermediate
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 rounded-lg bg-[#2b2f36] relative">
              <img
                src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png"
                className="rounded-lg mb-4"
              />
              <div className="text-[#fff] px-4">What Is Lisk (LSK)?</div>
              <div className="absolute bottom-0 p-4">
                <div className="text-[#fff]">Aug 11, 2022</div>
                <div className="text-[#fff] flex items-center text-sm">
                  <Dot css="bg-[#f0b90b]" />
                  <div> Intermediate</div>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-[#2b2f36] relative">
              <img
                src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png"
                className="rounded-lg mb-4"
              />
              <div className="text-[#fff] px-4">What Is Lisk (LSK)?</div>
              <div className="absolute bottom-0 p-4">
                <div className="text-[#fff]">Aug 11, 2022</div>
                <div className="text-[#fff] flex items-center text-sm">
                  <Dot css="bg-[#f0b90b]" />
                  <div> Intermediate</div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div
                className="grid bg-[#2b2f36] rounded-lg"
                style={{
                  gridTemplateColumns: 'minmax(auto,468px) 1fr',
                }}>
                <div className="flex text-white bg-[#2b2f36] flex-col justify-center items-end px-4 rounded-lg">
                  <div className="text-[2rem] leading-10 font-semibold">
                    {isFilterdArray[0]?.title}
                  </div>
                  <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
                    Jul 7, 2022 5m
                  </div>
                  <div className="flex items-center">
                    <Dot css="bg-[#F0B90B]" /> Intermediate
                  </div>
                </div>
                <img className="gridImg" />
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid bg-[#2b2f36] rounded-lg">
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'minmax(auto,176px) 1fr',
                  }}>
                  <img
                    src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png"
                    className="rounded-lg"
                  />
                  <div className="text-white flex items-center px-4">
                    What Is Inflation?
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid bg-[#2b2f36] rounded-lg">
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'minmax(auto,176px) 1fr',
                  }}>
                  <img
                    src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png"
                    className="rounded-lg"
                  />
                  <div className="text-white flex items-center px-4">
                    What Is Inflation?
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[71rem] mx-auto  mxl:w-[80%]  justify-center px-4 py-12 items-center">
            <div className="text-white mr-2">See more content about this topic</div>
            <svg
              width={18}
              height={18}
              viewBox="0 0 18 15"
              className="bidi-element css-1q915qx e3ftz9k0"
              xmlns="http://www.w3.org/2000/svg"
              fill="#F0B90B">
              <path d="M10.5 15L9.1 13.6L14.2 8.5L5.68248e-07 8.5L7.43094e-07 6.5L14.2 6.5L9.1 1.4L10.5 -6.55671e-07L18 7.5L10.5 15Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-2 m-auto max-w-[71rem] w-full"
        style={{
          gridTemplateColumns: 'minmax(auto,568px) 1fr',
        }}>
        <div className="col-span-1">
          <img src="/task.svg" className="w-full" />
        </div>
        <div className="col-span-1 h-full content-center">
          <div className="grid justify-center  content-center h-full">
            <div className="text-[2.5rem] text-[#14151A] font-semibold mb-2">
              No idea what you just scrolled through?
            </div>
            <div className="text-[1.5rem] text-[#14151A] font-normal mb-2">
              Not to worry. Our no-nonsense beginner's guide will get you up to speed.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[71rem] mx-auto  mxl:w-[80%]">
        <div className="py-[3.5rem]">
          <PostTitle title="Essentials" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="">
            <PostList data={data?.findAllPost.slice(0, 3)} />
          </div>
        </div>
      </div>

      <div className="w-[71rem] mx-auto  mxl:w-[80%]">
        <div className="py-[3.5rem]">
          <PostTitle title="React" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="">
            <PostList data={data?.findAllPost.slice(0, 3)} />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Home;

{
  /* <div>
<div className="bats">
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
</div>
</div> */
}

{
  /* <ListTrail
              css="grid grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2 "
              length={a.length}
              options={{
                opacity: 1,
                x: 0,
                from: { opacity: 0, x: -20 },
              }}
              renderItem={index => {
                const article = a[index];
                return (
                  <Link
                    href={`/article/[id]`}
                    as={`/article/${article.id}`}
                    scroll={false}>
                    <Section>
                      <div className="border-2 rounded-2xl">
                        <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/76b56862bbb4490d84dc71f32f909174.png" />
                        {article.title}
                      </div>
                    </Section>
                  </Link>
                );
              }}
            /> */
}
