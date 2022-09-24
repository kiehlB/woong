import { useState } from 'react';
import { MainTag, Tags } from '../base/Header';
import TagItem from './TagItem';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkActionDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export type TagListProps = {
  tag: MainTag[];
  globalTag: string[];
  toStore: (payload: string[]) => AnyAction;
  variant?: string;
  size?: string;
  add?: boolean;
  bg?: string;
};

function TagList({ tag, globalTag, toStore, variant, size, add, bg }: TagListProps) {
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

  const data = tag.filter(function (element) {
    return element !== undefined;
  });

  return (
    <>
      {data?.map(e => (
        <TagItem
          key={e?.id}
          tag={e?.name}
          bg={bg}
          handleCheck={handleCheck}
          globalTag={globalTag}
          checked={globalTag?.includes(e?.name)}
          variant={variant}
          size={size}
          add={add}
        />
      ))}
    </>
  );
}

export default TagList;
