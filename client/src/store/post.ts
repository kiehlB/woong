import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from './store';

export interface postsState {
  post: object;
  error: string;
  search: string;
}

export const initialState = {
  post: {},
  error: '',
  search: '',
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsSuccess(state, { payload }) {
      state.post = payload;
    },
    getPostsFailure(state, { payload }: PayloadAction<postsState>) {
      state.error = payload.error;
    },
    setPostSearch: (state, action) => {
      state.search = action.payload;
    },

    fetchPostInit(state) {
      state.post = '';
    },
  },
});

export const { getPostsSuccess, getPostsFailure, fetchPostInit, setPostSearch } =
  postsSlice.actions;

export const PostGet =
  (payload): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getPostsSuccess(payload));
  };

export const PostInit = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(fetchPostInit());
};

export default postsSlice.reducer;
