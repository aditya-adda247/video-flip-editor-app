import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TabState = {
    selectedTab: 'generate-tab' | 'preview-tab';
  };
  
const initialState: TabState = {
    selectedTab: 'generate-tab',  // default value
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<'generate-tab' | 'preview-tab'>) {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = tabSlice.actions;

export default tabSlice.reducer;
