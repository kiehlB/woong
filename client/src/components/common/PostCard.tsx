import { ListTrail } from '../animation/Trail';
import Link from 'next/link';

export type PostCardProps = {
  article: any;
};

function PostCard({ article }: PostCardProps) {
  return (
    <a className="text-black" aria-label={article.title}>
      <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/76b56862bbb4490d84dc71f32f909174.png" />
      <div> {article.title}</div>
      <div> {article.title}</div>
      <div> {article.title}</div>
      <div> {article.title}</div>
      <div> {article.title}</div>
      <div> {article.title}</div>
      <div> {article.title}</div>
      <div> {article.title}</div>
      <div> {article.title}</div>
    </a>
  );
}

export default PostCard;
