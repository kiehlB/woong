import { ListTrail } from '../animation/Trail';
import HeaderTopicItem from '../base/HeaderTopicItem';
import TagItem from '../tags/TagItem';
import Link from 'next/link';
import { DateTime } from 'luxon';
import Dot from '../common/TagsDot';

interface InputProps {
  id: number;
  title: string;
  posts_tags: any;
  created_at: any;
  post_likes: any;
}

export type PostCardProps = {
  article: InputProps;
};

function PostCard({ article }: PostCardProps) {
  console.log(article);
  return (
    // <div data-aos="fade-down">

    <Link href={`/post/${article.id}`}>
      <a className="text-black relative w-full" aria-label={article.title}>
        <div className="absolute flex pl-6 w-full flex-wrap pt-4">
          {article.posts_tags.map(e => (
            <HeaderTopicItem name={e.tag.name} size="small" key={e.id} />
          ))}
        </div>
        <img
          src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/76b56862bbb4490d84dc71f32f909174.png"
          className="rounded-xl mb-6"
        />

        <div className="px-6 mb-4 flex flex-1">
          <div className="font-Cabin text-[#14151A] mb-6 text-[1.25rem] leading-6  min-h-[3.5rem]  font-semibold">
            {article.title}
          </div>
        </div>
        <div className="flex items-center px-6 pb-3">
          <TagItem tag="Intermediate" variant="yello" size="small">
            <Dot css="bg-[#f0b90b]" />
          </TagItem>
          <div className="ml-4 text-[#76808F] leading-snug font-normal py-4">
            {DateTime.fromISO(article.created_at).toLocaleString().slice(0, -1)}
          </div>
          <div className="ml-4 text-[#76808F]">
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
            </svg>
          </div>
          <div className="pl-1 text-[#76808F]">{article.post_likes.length}</div>
        </div>
      </a>
    </Link>
    // </div>
  );
}

export default PostCard;
