import { ListTrail } from '../animation/Trail';
import HeaderTopicItem from '../base/HeaderTopicItem';
import TagItem from '../tags/TagItem';
import Link from 'next/link';
import { DateTime } from 'luxon';
import Dot from '../common/TagsDot';
import { Post } from '../../types/apolloComponent';
import RatioImage from '../common/RatioImage';

export type PostCardProps = {
  article: Post;
};

function PostCard({ article }: PostCardProps) {
  return (
    <Link href={`/post/${article.id}`}>
      <div
        className="text-black relative w-full border border-stone-100 rounded-xl cursor-pointer"
        aria-label={article.title}>
        <div className="absolute flex pl-6 w-full flex-wrap pt-4 z-40">
          {article?.posts_tags?.map(e => (
            <HeaderTopicItem
              name={e.tag.name}
              size="small"
              key={e?.tag?.id}
              disable={true}
            />
          ))}
        </div>
        {article.thumbnail ? (
          <RatioImage
            widthRatio={1.916}
            heightRatio={1.2}
            src={article.thumbnail}
            className="rounded-xl mb-6 h-[12.375rem] w-full object-cover"
          />
        ) : (
          <RatioImage
            widthRatio={1.916}
            heightRatio={1.2}
            src="img/noImg.jpg"
            className="rounded-xl mb-6 h-[12.375rem] w-full object-cover "
          />
        )}

        <div className="px-6 mb-4 flex flex-1 break-all line-clamp-3">
          <div className="font-Cabin text-[#14151A] mb-6 text-[1.25rem] leading-7 min-h-[3.5rem] font-medium line-clamp-2">
            {article.title}
          </div>
        </div>
        <div className="flex items-center px-6 pb-3">
          <TagItem tag={article?.difficulty} variant={article?.difficulty} size="small">
            <Dot css={article?.difficulty} />
          </TagItem>
          <div className="ml-4 text-[#76808F] leading-snug font-normal py-4">
            {DateTime.fromISO(article.created_at).toLocaleString().slice(0, -1)}
          </div>
          <div className="ml-4 text-[#76808F]">
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
            </svg>
          </div>
          <div className="pl-1 text-[#76808F]">{article?.post_likes?.length}</div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
