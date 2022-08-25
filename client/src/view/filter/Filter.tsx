import { useSelector } from 'react-redux';
import { MenuItems } from '../../components/base/Header';
import PageTemplate from '../../components/base/PageTemplate';
import { Button } from '../../components/common/Button';
import TagItem from '../../components/tags/TagItem';
import TagList from '../../components/tags/TagList';
import AddTag from '../../static/svg/addtag';
import { RootState } from '../../store/rootReducer';
import useGetTags from '../home/hooks/usegetTags';

export type FilterProps = {};

function Filter({}: FilterProps) {
  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  const globalTag = useSelector((state: RootState) => (state as any)?.tag?.tag);

  const mergeTag = MenuItems.concat((getTagsData as any)?.getAllTags);

  // if (getTagsLoading) return <div>Loading</div>;

  console.log(getTagsData?.getAllTags?.filter(e => globalTag.includes(e.name)));

  return (
    <PageTemplate tag={getTagsData}>
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
                  <TagList tag={mergeTag} />
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
