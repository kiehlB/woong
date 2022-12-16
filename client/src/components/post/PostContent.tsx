import React, { useState, useEffect, useMemo } from 'react';
import { parseHeadings } from '../../lib/heading';
 
export interface PostContentProps {
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ body }) => {
 
 

  return (
    <div>
      <div className="pt-14" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default PostContent;
