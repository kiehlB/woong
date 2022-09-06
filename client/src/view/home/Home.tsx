import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/base/PageTemplate';
import { Button } from '../../components/common/Button';
import PostCard from '../../components/common/PostCard';
import PostTitle from '../../components/common/PostTitle';
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

const Home: NextPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useGetPosts();

  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  const globalTag = useSelector((state: RootState) => (state as any)?.tag?.mainTag);
  const globalTag2 = useSelector((state: RootState) => (state as any)?.tag?.tag);

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

  return (
    <PageTemplate tag={getTagsData}>
      <Main post={data} />
      <div className="w-[71rem] mx-auto  mxl:w-[80%]">
        <div className="py-[3.5rem]">
          <PostTitle title="Latest Releases" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="">
            <PostList data={data} />
          </div>
        </div>

        <div className="mb-7">
          <SvgCard svg={<Swing />} />
        </div>

        <div className="py-14">
          <SvgCard svg={<Bicycle />} />
        </div>
      </div>
      <div className="bg-[#14151A]">
        <div className="w-[71rem] mx-auto  mxl:w-[80%]">
          <div className="flex pt-14">
            <div className="text-white">Topics : </div>
            <div className="text-[#aeb4bc] flex flex-1 flex-wrap items-center gap-4 px-4">
              <TagList tag={mergeTag} globalTag={globalTag} toStore={getMainTag} />
            </div>
          </div>

          <div className="flex my-8 ">
            <div className="text-white  mr-4">Difficulty:</div>

            <TagItem tag="Begnner" variant="green" size="medium">
              <Dot bg="bg-[#02C076]" />
            </TagItem>

            <div className="ml-4">
              <TagItem tag="Intermediate" variant="yello" size="medium">
                <Dot bg="bg-[#f0b90b]" />
              </TagItem>
            </div>

            <div className="ml-4">
              <TagItem tag="Advanced" variant="red" size="medium">
                <Dot bg="bg-[#d9304e]" />
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
                    {filteredArray[0]?.title}
                  </div>
                  <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
                    Jul 7, 2022 5m
                  </div>
                  <div className="flex items-center">
                    <Dot bg="bg-[#F0B90B]" /> Intermediate
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 rounded-lg bg-[#2b2f36] relative ">
              <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png" />
              <div className="text-[#fff]">What Is Lisk (LSK)?</div>
              <div className="absolute bottom-0 p-4">
                <div className="text-[#fff]">Aug 11, 2022 5m</div>
                <div className="text-[#fff]">Intermediate</div>
              </div>
            </div>

            <div className="col-span-1 bg-[#2b2f36]">
              <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png" />
              <div className="text-[#fff]">What Is Lisk (LSK)?</div>
              <div className="text-[#fff]">Aug 11, 2022 5m</div>
              <div className="text-[#fff]">Intermediate</div>
            </div>

            <div className="col-span-3">
              <div
                className="grid bg-[#2b2f36] rounded-lg "
                style={{
                  gridTemplateColumns: 'minmax(auto,468px) 1fr',
                }}>
                <div className="flex text-white bg-[#2b2f36] flex-col  justify-center items-end px-4 rounded-lg px-4">
                  <div className="text-[2rem] leading-10 font-semibold">
                    {filteredArray[0]?.title}
                  </div>
                  <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
                    Jul 7, 2022 5m
                  </div>
                  <div className="flex items-center">
                    <Dot bg="bg-[#F0B90B]" /> Intermediate
                  </div>
                </div>
                <img className="gridImg " />
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid border-">
                <div
                  className="grid border-2"
                  style={{
                    gridTemplateColumns: 'minmax(auto,176px) 1fr',
                  }}>
                  <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png" />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="grid border-">
                <div
                  className="grid border-2"
                  style={{
                    gridTemplateColumns: 'minmax(auto,176px) 1fr',
                  }}>
                  <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png" />
                </div>
              </div>
            </div>
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
