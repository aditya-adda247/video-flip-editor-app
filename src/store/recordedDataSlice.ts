import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RecordedData = {
    timeStamp: number;  // assuming currentTime is a number
    coordinates: [number, number, number, number];  // x, y, width, height
    volume: number;
    playbackRate: number;
  };
  

type RecordedDataState = {
  recordedData: RecordedData[];
};

const initialState: RecordedDataState = {
  recordedData: [],
};

const recordedDataSlice = createSlice({
  name: 'recordedData',
  initialState,
  reducers: {
    setRecordedData(state, action: PayloadAction<RecordedData[]>) {
      state.recordedData = action.payload;
    },
    addRecordedData(state, action: PayloadAction<RecordedData>) {
      state.recordedData.push(action.payload);
    },
    clearRecordedData(state) {
      state.recordedData = [];
    },
  },
});

export const { setRecordedData, addRecordedData, clearRecordedData } = recordedDataSlice.actions;

export default recordedDataSlice.reducer;