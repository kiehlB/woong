import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import PageTemplate from '../../components/base/PageTemplate';
import SvgCard from '../../components/common/SvgCard';
import Dot from '../../components/common/TagsDot';
import Main from '../../components/main';
import TagItem from '../../components/tags/TagItem';
import Bicycle from '../../static/svg/bicycle';
import Swing from '../../static/svg/swing';
import { RootState } from '../../store/rootReducer';
import TagList from '../../components/tags/TagList';
import { getMainTag } from '../../store/tag';
import PostList from '../../components/post/PostList';
import PostTitle from '../../components/post/PostTitle';
import styled from 'styled-components';
import { useState } from 'react';
import { DateTime } from 'luxon';
import useGetPosts from '../../components/post/hooks/usegetPosts';
import useGetTags from '../../components/tags/hooks/usegetTags';
import useTrendingPosts from '../../components/post/hooks/useTrendingPosts';
import Link from 'next/link';
import { LayoutSection } from '../../components/sections/layout-sesction';
import media from '../../lib/styles/media';

const Home: NextPage = () => {
  const { loading, error, data, fetchMore, networkStatus } = useGetPosts();
  const {
    loading: TrendingPostsLoading,
    error: TrendingPostsError,
    data: TrendingPostsData,
  } = useTrendingPosts();

  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  const globalTag = useSelector((state: RootState) => state?.tag?.mainTag);

  const [Difficulty, setDifficulty] = useState([]);

  const filteredArray =
    data?.findAllPost.filter(e =>
      e.posts_tags.map(el => globalTag.includes(el.tag.name)).includes(true),
    ).length == 0
      ? data?.findAllPost
      : data?.findAllPost.filter(e =>
          e.posts_tags.map(el => globalTag.includes(el.tag.name)).includes(true),
        );

  const isArray = filteredArray ? filteredArray : [];

  const isFilterdArray =
    Difficulty.length !== 0
      ? isArray.filter(e => Difficulty.includes(e?.difficulty))
      : isArray;

  const handleCheck = event => {
    let updatedList = [...Difficulty];

    if (event.target.checked) {
      updatedList = [...Difficulty, event.target.value];
    } else {
      updatedList.splice(Difficulty.indexOf(event.target.value), 1);
    }

    setDifficulty(updatedList);
  };

  return (
    <PageTemplate tag={getTagsData}>
      <Main post={data} />
      <LayoutSection>
        <div className="py-[3.5rem] px-4">
          <PostTitle title="Latest Releases" subtitle="SEE ALL LATEST RELEASES" />
          <div>
            <PostList data={data?.findAllPost.slice(0, 9)} />
          </div>
        </div>

        <div className="py-14 px-4">
          <SvgCard
            svg={<Swing />}
            text="#black"
            title={`learning about web & Security`}
            subtitle={`Build your web knowledge, complete quizzes`}
            bg="#FAFAFA"
          />
        </div>

        <div className="py-14 px-4">
          <SvgCard
            bg="#2b2f36"
            text="#fff"
            svg={<Bicycle />}
            title={`Keep an eye on Glossaries`}
            subtitle={`Learn more about glossaries`}
          />
        </div>
      </LayoutSection>

      <LayoutSection>
        <div className="py-[3.5rem] px-4">
          <PostTitle title="Trending" subtitle="SEE ALL LATEST RELEASES  " />
          <div>
            <PostList data={TrendingPostsData?.getTrendingPosts} />
          </div>
        </div>
      </LayoutSection>
      <div className="bg-[#14151A] px-4">
        <LayoutSection>
          <div className="flex pt-14">
            <div className="text-white px-4">Topics : </div>
            <div className="text-[#aeb4bc] flex flex-1 flex-wrap items-center gap-4 px-4">
              <TagList
                tag={getTagsData?.getAllTags}
                globalTag={globalTag}
                toStore={getMainTag}
                size="small"
                bg="smallYello"
              />
            </div>
          </div>

          <div className="flex my-8">
            <div className="text-white mr-4 px-4">Difficulty:</div>

            <TagItem
              tag="Beginner"
              variant=" Beginner"
              checked={Difficulty?.includes('Beginner')}
              size="medium"
              add={true}
              bg="green"
              handleCheck={handleCheck}>
              <Dot css="Beginner" />
            </TagItem>

            <div className="ml-4">
              <TagItem
                tag="Intermediate"
                variant="Intermediate"
                size="medium"
                add={true}
                bg="yello"
                handleCheck={handleCheck}
                checked={Difficulty?.includes('Intermediate')}>
                <Dot css="Intermediate" />
              </TagItem>
            </div>

            <div className="ml-4">
              <TagItem
                tag="Advanced"
                variant="Advanced"
                size="medium"
                add={true}
                bg="red"
                handleCheck={handleCheck}
                checked={Difficulty?.includes('Advanced')}>
                <Dot css="Advanced" />
              </TagItem>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3 mxl:col-span-4">
              {isFilterdArray[0] ? (
                <PostGridStyled className="grid bg-[#2b2f36] rounded-lg h-full">
                  {isFilterdArray[0].thumbnail ? (
                    <img
                      src={isFilterdArray[0]?.thumbnail}
                      className="w-full object-cover rounded-xl h-full"
                    />
                  ) : (
                    <img
                      src="img/noImg.jpg"
                      className="w-full object-cover rounded-xl h-full"
                    />
                  )}

                  <div className="flex text-white bg-[#2b2f36] flex-col justify-center px-4 rounded-lg mmd:py-8">
                    <div className="text-[2rem] leading-10 font-semibold  break-all line-clamp-3">
                      {isFilterdArray[0]?.title}
                    </div>
                    <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
                      {DateTime.fromISO(isFilterdArray[0]?.created_at)
                        .toLocaleString()
                        .slice(0, -1)}
                    </div>
                    <div className="flex items-center">
                      <Dot css={isFilterdArray[0]?.difficulty} />{' '}
                      {isFilterdArray[0]?.difficulty}
                    </div>
                  </div>
                </PostGridStyled>
              ) : (
                ''
              )}
            </div>
            {isFilterdArray[1] ? (
              <div className="col-span-1 rounded-lg bg-[#2b2f36] relative mxl:col-span-2 mmd:col-span-4">
                {isFilterdArray[1].thumbnail ? (
                  <img
                    src={isFilterdArray[1]?.thumbnail}
                    className=" w-full object-cover rounded-xl"
                  />
                ) : (
                  <img src="img/noImg.jpg" className="w-full object-cover rounded-xl" />
                )}

                <div className="text-[#fff] px-4 pt-2 break-all py-24">
                  <div className=" text-[1.3rem] leading-8 font-semibold break-all line-clamp-2">
                    {isFilterdArray[1]?.title}
                  </div>
                </div>
                <div className="absolute bottom-0 p-4">
                  <div className="text-[#F0B90B] font-normal mt-2 mb-2 text-[1rem]">
                    {DateTime.fromISO(isFilterdArray[1]?.created_at)
                      .toLocaleString()
                      .slice(0, -1)}
                  </div>
                  <div className="text-[#fff] flex items-center text-sm">
                    <Dot css={isFilterdArray[1]?.difficulty} />{' '}
                    {isFilterdArray[1]?.difficulty}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            {isFilterdArray[2] ? (
              <div className="col-span-1 bg-[#2b2f36] relative mxl:col-span-2 mmd:col-span-4">
                {isFilterdArray[2].thumbnail ? (
                  <img
                    src={isFilterdArray[2]?.thumbnail}
                    className="w-full object-cover rounded-lg"
                  />
                ) : (
                  <img src="img/noImg.jpg" className="w-full object-cover rounded-lg" />
                )}

                <div className="text-[#fff] px-4 pt-2  py-24">
                  <div className="text-[1.3rem] leading-8 font-semibold break-all line-clamp-2">
                    {isFilterdArray[2]?.title}
                  </div>
                </div>
                <div className="absolute bottom-0 p-4">
                  <div className="text-[#F0B90B] font-normal mt-2 mb-2 text-[1rem]">
                    {DateTime.fromISO(isFilterdArray[2]?.created_at)
                      .toLocaleString()
                      .slice(0, -1)}
                  </div>
                  <div className="text-[#fff] flex items-center text-sm">
                    <Dot css={isFilterdArray[2]?.difficulty} />{' '}
                    {isFilterdArray[2]?.difficulty}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            {isFilterdArray[3] ? (
              <div className="col-span-3 mxl:col-span-4">
                <PostGridStyled className="grid bg-[#2b2f36] rounded-lg h-full">
                  <div className="flex text-white bg-[#2b2f36] flex-col justify-center items-end px-4 rounded-lg">
                    <div className="text-[2rem] leading-10 font-semibold">
                      <div className="text-[1.3rem] leading-8 font-semibold break-all line-clamp-3">
                        {isFilterdArray[3]?.title}
                      </div>
                    </div>
                    <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
                      {DateTime.fromISO(isFilterdArray[3]?.created_at)
                        .toLocaleString()
                        .slice(0, -1)}
                    </div>
                    <div className="flex items-center">
                      <Dot css={isFilterdArray[3]?.difficulty} />{' '}
                      {isFilterdArray[3]?.difficulty}
                    </div>
                  </div>

                  {isFilterdArray[3].thumbnail ? (
                    <img
                      src={isFilterdArray[3]?.thumbnail}
                      className="w-full object-cover rounded-xl h-full"
                    />
                  ) : (
                    <img
                      src="img/noImg.jpg"
                      className="w-full object-cover rounded-xl h-full"
                    />
                  )}
                </PostGridStyled>
              </div>
            ) : (
              ''
            )}
            {isFilterdArray[4] ? (
              <div className="col-span-2 mxl:col-span-4">
                <div className="grid bg-[#2b2f36] rounded-lg">
                  <PostSmallGridStyled className="grid">
                    {isFilterdArray[4].thumbnail ? (
                      <img
                        src={isFilterdArray[4]?.thumbnail}
                        className=" w-full object-cover min-h-[6.1875rem] rounded-lg"
                      />
                    ) : (
                      <img
                        src="img/noImg.jpg"
                        className="w-full object-cover min-h-[6.1875rem] rounded-lg"
                      />
                    )}

                    <div className="text-white flex items-center px-4 text-[1.3rem] font-semibold">
                      <div className="text-[1.3rem] leading-8 font-semibold break-all line-clamp-1">
                        {isFilterdArray[4]?.title}
                      </div>
                    </div>
                  </PostSmallGridStyled>
                </div>
              </div>
            ) : (
              ''
            )}
            {isFilterdArray[5] ? (
              <div className="col-span-2 mxl:col-span-4">
                <div className="grid bg-[#2b2f36] rounded-lg">
                  <PostSmallGridStyled className="grid">
                    {isFilterdArray[5].thumbnail ? (
                      <img
                        src={isFilterdArray[5]?.thumbnail}
                        className="w-full object-cover min-h-[6.1875rem] rounded-lg"
                      />
                    ) : (
                      <img
                        src="img/noImg.jpg"
                        className="w-full object-cover min-h-[6.1875rem] rounded-lg"
                      />
                    )}

                    <div className="text-white flex items-center px-4 text-[1.3rem] font-semibold">
                      <div className="text-[1.3rem] leading-8 font-semibold break-all line-clamp-1">
                        {isFilterdArray[5]?.title}
                      </div>
                    </div>
                  </PostSmallGridStyled>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="flex w-[71rem] mx-auto  mxl:w-[80%]  justify-center px-4 py-12 items-center">
            <Link href="/filter">
              <div className="text-white mr-2 cursor-pointer">
                See more content about this topic
              </div>
            </Link>
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
        </LayoutSection>
      </div>

      <BigPostGridStyled className="grid grid-cols-2 m-auto max-w-7xl mx-auto w-full py-[3.5rem] gap-[1rem] px-4 mmd:grid-cols-1">
        <div className="col-span-1 py-[1.5rem]">
          <img src="/task.svg" className="w-full" />
        </div>
        <div className="col-span-1 h-full content-center ">
          <div className="grid justify-center  content-center h-full">
            <div className="text-[2.5rem] text-[#14151A] font-semibold mb-2">
              No idea what you just scrolled through?
            </div>
            <div className="text-[1.5rem] text-[#14151A] font-normal mb-2">
              Not to worry. Our no-nonsense beginner's guide will get you up to speed.
            </div>
          </div>
        </div>
      </BigPostGridStyled>
      <LayoutSection>
        <div className="py-[3.5rem] px-4">
          <PostTitle title="Essentials" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="">
            <PostList data={data?.findAllPost.slice(0, 3)} />
          </div>
        </div>
      </LayoutSection>

      <LayoutSection>
        <div className="py-[3.5rem] px-4">
          <PostTitle title="React" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="">
            <PostList data={data?.findAllPost.slice(0, 3)} />
          </div>
        </div>
      </LayoutSection>

      {/* <div className="grid grid-cols-2 m-auto max-w-[71rem] w-full min-h-[15.625rem] gap-4  mb-[3.5rem]"> */}
      {/* <div className="col-span-1 bg-[rgba(240,185,11,0.15)] rounded-2xl h-full ">
          <div className="grid grid-cols-2 justify-center content-center h-full">
            <img src="/1.svg" className="w-full col-span-1 h-full py-12" />
            <div className="col-span-1 h-full grid  justify-center content-center">
              <div className="text-[#14151A] mb-4 text-[2rem] leading-10 font-semibold">
                Lost in all the crypto slang?
              </div>
              <div className="text-[#14151A] mb-6 leading-relaxed">
                Take a closer look at our blockchain & crypto glossary.
              </div>
              <div>Check out Glossary</div>
            </div>
          </div>
        </div> */}

      {/* <div className="col-span-1 bg-[#2b2f36] rounded-2xl h-full">
          <div className="grid grid-cols-2 justify-center content-center h-full">
            <img src="/2.svg" className="w-full col-span-1 h-full" />
            <div className="col-span-1 h-full grid  justify-center content-center">
              <div className="text-[#14151A] mb-4 text-[2rem] leading-10 font-semibold">
                Lost in all the crypto slang?
              </div>
              <div className="text-[#14151A] mb-6 leading-relaxed">
                Take a closer look at our blockchain & crypto glossary.
              </div>
              <div>Check out Glossary</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 m-auto max-w-[71rem] w-full min-h-[15.625rem] gap-4 py-[6.5rem]">
        <div className="flex flex-col flex-1 h-full">
          <div className="flex flex-col flex-1">
            <div className="text-[#F0B90B] text-[5rem] leading-[4.5rem] mb-6">278</div>
            <div className="text-[1.25rem] text-[#474D57] leading-normal">
              That's the number of terms in our glossary. How many do you know?
            </div>
          </div>
          <Grid.Container>
            <Grid>
              <Input
                clearable
                underlined
                color="warning"
                labelPlaceholder="Search glossary"
                contentRight={
                  <svg
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="css-9uy14h e3ftz9k0">
                    <path
                      d="M13.5 2.57457e-06C11.9038 -0.00124001 10.3396 0.447331 8.98664 1.29429C7.6337 2.14125 6.54681 3.35231 5.85056 4.78864C5.15432 6.22496 4.87691 7.82841 5.05014 9.41517C5.22337 11.0019 5.84023 12.5077 6.82999 13.76L0.299988 20.29L1.70999 21.7L8.23999 15.17C9.30415 16.0093 10.5536 16.5818 11.8841 16.8399C13.2146 17.098 14.5875 17.0341 15.8883 16.6535C17.1891 16.273 18.3799 15.5868 19.3615 14.6523C20.3431 13.7178 21.087 12.5621 21.531 11.2816C21.975 10.0011 22.1062 8.63293 21.9138 7.29136C21.7214 5.9498 21.211 4.67371 20.425 3.5696C19.639 2.46549 18.6003 1.56539 17.3957 0.94443C16.191 0.323466 14.8553 -0.000352271 13.5 2.57457e-06ZM13.5 15C12.2144 15 10.9577 14.6188 9.88878 13.9046C8.81986 13.1903 7.98674 12.1752 7.49477 10.9874C7.0028 9.79973 6.87408 8.49279 7.12488 7.23191C7.37569 5.97104 7.99475 4.81285 8.90379 3.90381C9.81283 2.99477 10.971 2.3757 12.2319 2.1249C13.4928 1.87409 14.7997 2.00282 15.9874 2.49479C17.1751 2.98676 18.1903 3.81988 18.9045 4.8888C19.6188 5.95772 20 7.21442 20 8.5C19.9966 10.2229 19.3107 11.8742 18.0925 13.0925C16.8742 14.3108 15.2229 14.9967 13.5 15Z"
                      fill="currentColor"></path>
                  </svg>
                }
              />
            </Grid>
          </Grid.Container>
        </div>
        <div className="shadow-xl p-6 rounded-2xl">
          <div>
            <HeaderTopicItem name={'Glossary'} size="small" />
            <div className="text-[#14151A] text-[2rem] ">Binance Labs</div>
            <div className="bg-[#F0B90B] h-1 mt-4 w-[2rem]"></div>
            <div className="mb-8 leading-normal text-[#14151A]">
              A social impact fund and an initiative to incubate, invest, and empower
              blockchain and cryptocurrency entre...
            </div>
            <div>Full definition</div>
          </div>
        </div>
        <div className="shadow-xl p-6 rounded-2xl">
          <div>dd</div>
        </div> */}
      {/* </div> */}
    </PageTemplate>
  );
};

export default Home;

const PostGridStyled = styled.div`
  grid-template-columns: minmax(auto, 468px) 1fr;

  ${media.custom(768)} {
    grid-template-columns: none;
  }
`;

const BigPostGridStyled = styled.div`
  grid-template-columns: minmax(auto, 568px) 1fr;

  ${media.custom(768)} {
    grid-template-columns: none;
  }
`;

const PostSmallGridStyled = styled.div`
  grid-template-columns: minmax(auto, 176px) 1fr;

  ${media.custom(768)} {
    grid-template-columns: none;
  }
`;
