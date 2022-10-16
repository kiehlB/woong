import { motion } from 'framer-motion';
import media from '../../lib/styles/media';
import { Post } from '../../types/apolloComponent';
import PostCard from './PostCard';
import styled from 'styled-components';

export type PostListProps = {
  data: Post[];
};

function PostList({ data }: PostListProps) {
  return (
    <FirstWrapper className="grid gap-9 grid-cols-3 mxl:grid-cols-2 mmd:grid-cols-1 auto-rows-fr">
      {data?.map(e => (
        <div
          key={e.id}
          className="transform  hover:translate-y-[-15px] transition duration-500 ease-in-out w-full">
          <div data-aos="fade-down" className="shadow-lg rounded-xl w-full">
            <PostCard article={e} />
          </div>
        </div>
      ))}
    </FirstWrapper>
  );
}

export default PostList;

const FirstWrapper = styled.div`
  grid-auto-rows: 1fr;
`;
