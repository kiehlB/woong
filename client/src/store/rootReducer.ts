import { combineReducers } from '@reduxjs/toolkit';
import Post_Reducer from './post';
import Tag_Reducer from './tag';

const rootReducer = combineReducers({
  post: Post_Reducer,
  tag: Tag_Reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
