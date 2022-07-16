import { ListTrail } from '../animation/Trail';
import Link from 'next/link';

export type PostCardProps = {};

const a = [
  {
    id: 1,
    title: '1',
  },
  {
    id: 1,
    title: '1',
  },
  { id: 1, title: '1' },
  {
    id: 1,
    title: '1',
  },
  { id: 1, title: '1' },
  { id: 1, title: '1' },
  { id: 1, title: '1' },
  { id: 1, title: '1' },
  { id: 1, title: '1' },
];
function PostCard({}: PostCardProps) {
  return (
    <div>
      <ListTrail
        length={a.length}
        options={{
          opacity: 1,
          height: 48,
          x: 0,
          from: { opacity: 0, height: 0, x: -20 },
        }}
        renderItem={index => {
          const article = a[index];
          return (
            <Link href={`/article/[id]`} as={`/article/${article.id}`} scroll={false}>
              <a className="text-black" aria-label={article.title}>
                {article.title}
              </a>
            </Link>
          );
        }}
      />
    </div>
  );
}

export default PostCard;
