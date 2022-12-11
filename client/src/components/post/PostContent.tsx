import React, { useState, useEffect, useMemo } from 'react';
import { parseHeadings } from '../../lib/heading';
import { usePostViewerDispatch } from './PostViewerContext';

export interface PostContentProps {
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ body }) => {
  const dispatch = usePostViewerDispatch();

  useEffect(() => {
    if (!body) return;
    const toc = parseHeadings(body);
    dispatch({ type: 'SET_TOC', payload: toc });
  }, [dispatch, body]);

  return (
    <div>
      <div className="pt-14" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default PostContent;
