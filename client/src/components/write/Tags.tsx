import React from 'react';
import { IoIosClose } from 'react-icons/io';

export type TagsProps = {
  tags: any;
  deleteTag: (e: string) => void;
  index: any;
};

function Tags(props: TagsProps) {
  return (
    <>
      <div className="flex justify-center items-center h-8 px-3 py-2 border rounded-2xl bg-[#F8F9FA]  text-[#12B886] mb-3 mr-3">
        <p>{props.tags?.text}</p>
        <span className="ml-1" onClick={() => props.deleteTag(props.index)}>
          <IoIosClose />
        </span>
      </div>
    </>
  );
}

export default Tags;
