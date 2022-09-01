import { motion } from 'framer-motion';
import PostCard from '../common/PostCard';

export type PostItemProps = {
  data: any;
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
