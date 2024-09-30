import { configureStore } from '@reduxjs/toolkit';
import videoConfigSlice from './videoConfigSlice'
import tabSlice from './tabSlice'
import recordedDataSlice from './recordedDataSlice'

const store = configureStore({
    reducer : {
        videoConfig: videoConfigSlice,
        selectedTab: tabSlice,
        recordedDataState: recordedDataSlice
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;