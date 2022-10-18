import { useSelector, useDispatch } from 'react-redux';
import { MenuItems } from '../../components/base/Header';
import PageTemplate from '../../components/base/PageTemplate';
import { Button } from '../../components/common/Button';
import TagList from '../../components/tags/TagList';
import { RootState } from '../../store/rootReducer';
import { tagGet } from '../../store/tag';
import PostList from '../../components/post/PostList';
import PostTitle from '../../components/post/PostTitle';
import { Pagination } from '@nextui-org/react';
import TagItem from '../../components/tags/TagItem';
import Dot from '../../components/common/TagsDot';
import { Children, useEffect, useState } from 'react';

import useGetTags from '../../components/tags/hooks/usegetTags';
import useCollapse from 'react-collapsed';
import clsx from 'clsx';
import { LayoutSection } from '../../components/sections/layout-sesction';
import useGetPosts from '../../components/post/hooks/useGetPosts';

export type FilterProps = {
  data: any;
};

function Collapse({ isActive, children }) {
  const [isExpanded, setExpanded] = useState(isActive);
  const { getToggleProps, getCollapseProps } = useCollapse({
    isExpanded,
  });

  useEffect(() => {
    setExpanded(isActive);
  }, [isActive, setExpanded]);

  return (
    <>
      <div {...getCollapseProps()}>
        <h2 style={{ margin: 0, padding: 10 }}>{children}</h2>
      </div>
    </>
  );
}

export function getAllData() {
  const { loading, error, data, fetchMore, networkStatus } = useGetPosts();

  if (loading) {
    return <div>Loading</div>;
  }

  return <Filter data={data} />;
}

function Filter({ data }: FilterProps) {
  const [Difficulty, setDifficulty] = useState([]);
  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  const [isExpanded, setExpanded] = useState(true);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const globalTag = useSelector((state: RootState) => (state as any)?.tag?.tag);

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

  const [resultFilter, setResultFilter] = useState(isFilterdArray);

  const handleCheck = event => {
    let updatedList = [...Difficulty];

    if (event.target.checked) {
      updatedList = [...Difficulty, event.target.value];
    } else {
      updatedList.splice(Difficulty.indexOf(event.target.value), 1);
    }

    setDifficulty(updatedList);
  };

  const ApplyFilterOnClick = () => {
    if (Difficulty.length == 0 && globalTag.length == 0) {
      return;
    }

    setResultFilter(isFilterdArray);
  };

  const ClearFilterOnClick = () => {
    setDifficulty([]);
    dispatch(tagGet([]));
    setResultFilter(data?.findAllPost ? data?.findAllPost : '');
    setPage(1);
    setExpanded(true);
  };

  const isFilterTrue = Difficulty.length == 0 && globalTag.length == 0;

  const restPost = resultFilter.length % 9 > 0 ? 1 : 0;

  const resultPagination = resultFilter.length / 9 + restPost;

  const handleChange = (value: number) => {
    setPage(value);
  };

  console.log(resultFilter.length);

  return (
    <PageTemplate tag={getTagsData}>
      <div className="font-Cabin bg-[#fafafa]">
        <Collapse isActive={isExpanded}>
          <LayoutSection cn="pt-12 p-4 mb-6 mxl:pb-12 relative">
            <div className="mb-8 text-[#14151A] font-semibold text-[2rem] leading-10">
              Topics at Post
            </div>
            <div>
              <div className="grid grid-cols-2">
                <div className="col-span-1 mxl:col-span-2">
                  <h2 className="text-[#14151A] mb-4  font-normal leading-normal">
                    Topics
                  </h2>
                  <div className="flex flex-wrap mx-auto">
                    <TagList
                      tag={getTagsData?.getAllTags}
                      globalTag={globalTag}
                      toStore={tagGet}
                      size="superSmall"
                      add={true}
                      bg="superSmall"
                    />
                  </div>
                </div>

                <section className="col-span-1 mxl:col-span-2 mxl:mt-8">
                  <h2 className="mb-4 ">Difficulty</h2>

                  <div className="flex flex-wrap h-20 text-black">
                    <div>
                      <TagItem
                        tag="Beginner"
                        variant="Beginner"
                        size="medium"
                        add={true}
                        checked={Difficulty?.includes('Beginner')}
                        handleCheck={handleCheck}
                        bg="green">
                        <Dot css="Beginner" />
                      </TagItem>
                    </div>

                    <div className="ml-2">
                      <TagItem
                        tag="Intermediate"
                        variant="Intermediate"
                        size="medium"
                        add={true}
                        bg="yello"
                        checked={Difficulty?.includes('Intermediate')}
                        handleCheck={handleCheck}>
                        <Dot css="Intermediate" />
                      </TagItem>
                    </div>

                    <div className="ml-2">
                      <TagItem
                        tag="Advanced"
                        variant="Advanced"
                        bg="red"
                        checked={Difficulty?.includes('Advanced')}
                        size="medium"
                        add={true}
                        handleCheck={handleCheck}>
                        <Dot css="Advanced" />
                      </TagItem>
                    </div>
                  </div>
                  <h2 className="text-black pt-6 font-normal">readingTime</h2>
                </section>
              </div>
            </div>
          </LayoutSection>
        </Collapse>

        <div className="bg-[#F5F5F5] flex p-4 w-full mmd:text-[0.8rem]">
          <LayoutSection cn="flex px-4 justify-between items-center mmd:flex-wrap">
            <div className="mr-6 leading-10">Layout</div>
            <svg
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="css-18puooo e3ftz9k0">
              <path d="M14.048 9.952H9.952V14.048H14.048V9.952ZM14.048 4H9.952V8.085H14.048V4ZM14.048 15.915H9.952V20H14.048V15.915ZM8.085 9.952H4V14.048H8.085V9.952ZM20 4H15.915V8.085H20V4ZM20 15.915H15.915V20H20V15.915ZM8.085 15.915H4V20H8.085V15.915ZM20 9.952H15.915V14.048H20V9.952ZM8.085 4H4V8.085H8.085V4Z"></path>
            </svg>
            <svg
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="rgb(174, 180, 188)"
              className="ml-2">
              <path d="M19.5 5H8.40002V7H19.5V5Z"></path>
              <path d="M19.5 17H8.40002V19H19.5V17Z"></path>
              <path d="M19.5 11H8.40002V13H19.5V11Z"></path>
              <path d="M6.81007 12.0101L5.39587 10.5959L3.98167 12.0101L5.39587 13.4243L6.81007 12.0101Z"></path>
              <path d="M6.77711 5.99666L5.36292 4.58246L3.94872 5.99666L5.36292 7.41086L6.77711 5.99666Z"></path>
              <path d="M6.84254 18.0236L5.42834 16.6094L4.01414 18.0236L5.42834 19.4378L6.84254 18.0236Z"></path>
            </svg>
            <div
              className={clsx('ml-4 px-4 text-[#aeb4bc]   cursor-not-allowed', {
                'bg-[#2B2F36] rounded flex justify-center items-center py-1 !text-white !cursor-pointer':
                  isFilterTrue == false,
              })}
              onClick={ApplyFilterOnClick}>
              Apply filters
            </div>
            <div
              className="ml-4 px-4 cursor-pointer hover:bg-[#FAFAFA] hover:py-1 hover:rounded "
              onClick={ClearFilterOnClick}>
              Clear filters
            </div>
            <div
              className="flex cursor-pointer ml-auto flex-none mmd:ml-0"
              onClick={() => setExpanded(x => !x)}>
              {isExpanded ? (
                <svg
                  width={24}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="css-go1xp0 e3ftz9k0">
                  <path d="M12.24 14.65L8 10.41L9.42 9L12.24 11.82L15.06 9L16.48 10.41L12.24 14.65Z"></path>
                </svg>
              ) : (
                <svg
                  width={24}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="css-1so3bvi e3ftz9k0">
                  <path d="M12.24 9L16.48 13.24L15.06 14.65L12.24 11.83L9.42 14.65L8 13.24L12.24 9Z"></path>
                </svg>
              )}

              <div>Hide filters</div>
            </div>
          </LayoutSection>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="pt-[3.5rem]">
            <div>
              Articles (
              {resultFilter.length == 0 ? isFilterdArray.length : resultFilter.length})
            </div>
            <div className="pt-8 w-full">
              <PostList
                data={
                  resultFilter.length == 0
                    ? isFilterdArray.slice((page - 1) * 9, page * 9)
                    : resultFilter.slice((page - 1) * 9, page * 9)
                }
              />
            </div>
          </div>
          <div className="py-16 flex justify-center">
            <Pagination
              total={resultPagination}
              initialPage={1}
              onChange={handleChange}
              page={page}
              color="warning"
              shadow
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default getAllData;
