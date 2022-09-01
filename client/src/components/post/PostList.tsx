import { motion } from 'framer-motion';
import PostCard from '../common/PostCard';

export type PostListProps = {
  data: any;
};

function PostList({ data }: PostListProps) {
  return (
    <div className="grid grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2">
      {data?.findAllPost?.map(e => (
        <div key={e.id} data-aos="fade-down" className=" shadow-lg rounded-xl">
          <PostCard article={e} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
