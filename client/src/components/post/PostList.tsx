import { motion } from 'framer-motion';
import PostCard from './PostCard';

export type PostListProps = {
  data: any;
};

function PostList({ data }: PostListProps) {
  return (
    <div className="grid grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2">
      {data?.map(e => (
        <div className="transform  hover:translate-y-[-15px] transition duration-500 ease-in-out">
          <div key={e.id} data-aos="fade-down" className="shadow-lg rounded-xl">
            <PostCard article={e} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
