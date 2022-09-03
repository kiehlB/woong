import { useState } from 'react';
import { Tags } from '../base/Header';
import TagItem from './TagItem';
import { useDispatch, useSelector } from 'react-redux';
import { getMainTag, tagGet } from '../../store/tag';

export type TagListProps = {
  tag: any;
  globalTag: any;
  toStore: any;
  variant?: any;
};

function TagList({ tag, globalTag, toStore, variant }: TagListProps) {
  const dispatch = useDispatch();

  const handleCheck = event => {
    let updatedList = [...globalTag];

    if (event.target.checked) {
      updatedList = [...globalTag, event.target.value];
    } else {
      updatedList.splice(globalTag.indexOf(event.target.value), 1);
    }

    console.log(updatedList);
    dispatch(toStore(updatedList));
  };

  return (
    <>
      {tag?.map(e => (
        <TagItem
          key={e?.id}
          tag={e?.name}
          handleCheck={handleCheck}
          globalTag={globalTag}
          checked={globalTag?.includes(e?.name)}
          variant={variant}
        />
      ))}
    </>
  );
}

export default TagList;
