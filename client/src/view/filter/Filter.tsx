import PageTemplate from '../../components/base/PageTemplate';
import { Button } from '../../components/common/Button';
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
      <div className="font-Cabin">
        <div className="max-w-[71rem] mx-auto pt-12 p-4">
          <div className="mb-8 text-[#14151A] font-semibold text-[2rem] leading-10">
            Topics at Post
          </div>
          <div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="text-[#14151A] mb-4  font-normal leading-normal">
                  Topics
                </div>
                <div className="flex flex-wrap mx-auto">
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

              <div className="col-span-1">
                <div>comment</div>

                <Button size="small" variant="danger" className="font-Roboto text-sm">
                  hello
                </Button>
                <Button size="medium" variant="secondary" className="font-Roboto text-sm">
                  hello
                </Button>
                <Button size="medium" variant="secondary" className="font-Roboto text-sm">
                  hello
                </Button>

                <div className="text-gray-400">readingTime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}

export default Filter;
