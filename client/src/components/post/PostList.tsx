import { motion } from 'framer-motion';
import { Post } from '../../types/apolloComponent';
import PostCard from './PostCard';

export type PostListProps = {
  data: Post[];
};

function PostList({ data }: PostListProps) {
  return (
    <div className="grid gap-9 grid-cols-3 mxl:grid-cols-2 mmd:grid-cols-1 auto-rows-fr">
      {data?.map(e => (
        <div
          key={e.id}
          className="auto-rows-auto transform  hover:translate-y-[-15px] transition duration-500 ease-in-out w-full">
          <div data-aos="fade-down" className="shadow-lg rounded-xl w-full">
            <PostCard article={e} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
