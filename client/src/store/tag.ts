import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { AppThunk, AppDispatch } from './store';

interface Tags {
  name: string;
}

export interface TagsState {
  tag: Tags[];
  mainTag: Tags[];
  error: string;
}

export const initialState = {
  tag: [],
  mainTag: [],
  error: '',
};

const TagsSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    getTagsSuccess(state: RootState, { payload }: PayloadAction<TagsState>) {
      console.log(payload);
      state.tag = payload;
    },
    getTagsFailure(state: RootState, { payload }: PayloadAction<TagsState>) {
      state.error = payload.error;
    },
    getMainTagsSuccess(state: RootState, { payload }) {
      state.mainTag = payload;
    },
    getMainTagsFailure(state: RootState, { payload }: PayloadAction<TagsState>) {
      state.error = payload.error;
    },

    fetchtagInit(state: RootState) {
      state.tag = [];
    },
  },
});

export const {
  getTagsSuccess,
  getTagsFailure,
  fetchtagInit,
  getMainTagsFailure,
  getMainTagsSuccess,
} = TagsSlice.actions;

export const tagGet =
  (payload): any =>
  async (dispatch: AppDispatch) => {
    console.log(payload);
    dispatch(getTagsSuccess(payload));
  };

export const getMainTag =
  (payload): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getMainTagsSuccess(payload));
  };

export const tagInit = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(fetchtagInit());
};

export default TagsSlice.reducer;
