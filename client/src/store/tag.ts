import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { AppThunk, AppDispatch } from './store';

interface Tags {
  name: string;
}

export interface TagsState {
  tag: Tags[];
  error: string;
}

export const initialState = {
  tag: [],
  error: '',
};

const TagsSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    getTagsSuccess(state: RootState, { payload }: PayloadAction<TagsState>) {
      if (!state.tag.includes(payload)) {
        state.tag = [...state.tag, payload];
      }
    },
    getTagsFailure(state: RootState, { payload }: PayloadAction<TagsState>) {
      state.error = payload.error;
    },
    fetchtagInit(state: RootState) {
      state.tag = [];
    },
  },
});

export const { getTagsSuccess, getTagsFailure, fetchtagInit } = TagsSlice.actions;

export const tagGet =
  (payload): any =>
  async (dispatch: AppDispatch) => {
    dispatch(getTagsSuccess(payload));
  };

export const tagInit = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(fetchtagInit());
};

export default TagsSlice.reducer;
