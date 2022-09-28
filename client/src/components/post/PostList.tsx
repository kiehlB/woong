import { motion } from 'framer-motion';
import { Post } from '../../types/apolloComponent';
import PostCard from './PostCard';

export type PostListProps = {
  data: Post[];
};

function PostList({ data }: PostListProps) {
  return (
    <div className="grid grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2 w-full">
      {data?.map(e => (
        <div
          key={e.id}
          className="transform  hover:translate-y-[-15px] transition duration-500 ease-in-out w-full">
          <div data-aos="fade-down" className="shadow-lg rounded-xl w-full">
            <PostCard article={e} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
