import PageTemplate from '../../components/base/PageTemplate';
import FilterButton from '../../components/common/FilterButton';
import AddTag from '../../static/svg/addtag';
import useGetTags from '../home/hooks/usegetTags';

export type FilterProps = {};

function Filter({}: FilterProps) {
  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  if (getTagsLoading) return <div>Loading</div>;

  return (
    <PageTemplate>
      <div className="font-Roboto">
        <div className="max-w-[71rem] mx-auto pt-12 p-4">
          <div className="mb-8 text-[#14151A] font-medium text-[2rem] leading-10">
            Topics at Post
          </div>
          <div>
            <div className="grid grid-cols-2">
              <div>
                <div className="text-[#14151A] mb-4 font-thin leading-normal">Topics</div>
                <div className="flex">
                  {getTagsData?.getAllTags?.map(e => (
                    <>
                      <div className="mb-2 mr-2 flex justify-end items-center text-[0.75rem] opacity-60 bg-[#F5F5F5] px-[0.75rem] py-[2px] rounded-full">
                        <div className="mr-1"> {e.name}</div>
                        <AddTag />
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div>
                <div>comment</div>
                <FilterButton />
                <div>d</div>
                <div>d</div>
                <div>d</div>
                <div>readingTime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default Filter;
