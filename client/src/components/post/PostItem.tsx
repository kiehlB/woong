import { motion } from 'framer-motion';
import { Post } from '../../types/apolloComponent';
import PostCard from './PostCard';

export type PostItemProps = {
  data: {
    findAllPost: Post[];
  };
};

function PostItem({ data }: PostItemProps) {
  return (
    <div>
      {data?.findAllPost?.map(e => (
        <div key={e.id} data-aos="fade-down" className=" shadow-lg rounded-xl">
          <PostCard article={e} />
        </div>
      ))}
    </div>
  );
}

export default PostItem;
