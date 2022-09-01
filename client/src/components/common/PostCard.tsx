import { ListTrail } from '../animation/Trail';
import Link from 'next/link';
import HeaderTopicItem from '../base/HeaderTopicItem';

interface InputProps {
  id: number;
  title: string;
  posts_tags: any;
}

export type PostCardProps = {
  article: InputProps;
};

function PostCard({ article }: PostCardProps) {
  return (
    // <div data-aos="fade-down">
    <a className="text-black" aria-label={article.title}>
      <div className="absolute flex">
        {article.posts_tags.map(e => (
          <HeaderTopicItem name={e.tag.name} size="small" />
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
      <div className="flex px-6 pb-6">
        <div>asdsd</div>
        <div>asdsd</div>
        <div>asdsd</div>
      </div>
    </a>
    // </div>
  );
}

export default PostCard;
