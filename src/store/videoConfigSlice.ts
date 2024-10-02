import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AspectRatio, aspectRatioOptions } from '../constants/consts';

type OverlayPosition = {
  x: number;
  y: number;
};

type OverlaySize = {
  width: number;
  height: number;
};

type VideoPlayerSize = {
  width: number;
  height: number;
};

type VideoConfigState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  cropperRatio: AspectRatio;
  isOverlayActive: boolean;
  overlayPosition: OverlayPosition;
  overlaySize: OverlaySize;
  videoPlayer: VideoPlayerSize;
};

type VideoConfigUpdate = Partial<VideoConfigState>;

const initialState: VideoConfigState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  playbackSpeed: 1,
  cropperRatio: aspectRatioOptions[0].value,
  isOverlayActive: false,
  overlayPosition: { x: 0, y: 0 },
  overlaySize: { width: 0, height: 0 },
  videoPlayer: {
    width: 0,
    height: 0,
  },
};

const videoConfigSlice = createSlice({
  name: 'videoConfig',
  initialState,
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setPlaybackSpeed(state, action: PayloadAction<number>) {
      state.playbackSpeed = action.payload;
    },
    setCropperRatio(state, action: PayloadAction<AspectRatio>) {
      state.cropperRatio = action.payload;
    },
    setIsOverlayActive(state, action: PayloadAction<boolean>) {
      state.isOverlayActive = action.payload;
    },
    setOverlayPosition(state, action: PayloadAction<OverlayPosition>) {
      state.overlayPosition = action.payload;
    },
    setOverlaySize(state, action: PayloadAction<OverlaySize>) {
      state.overlaySize = action.payload;
    },
    setVideoPlayerSize(state, action: PayloadAction<VideoPlayerSize>) {
      state.videoPlayer = action.payload;
    },
    setVideoConfig(state, action: PayloadAction<VideoConfigUpdate>) {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const {
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setPlaybackSpeed,
  setCropperRatio,
  setIsOverlayActive,
  setOverlayPosition,
  setOverlaySize,
  setVideoPlayerSize,
  setVideoConfig
} = videoConfigSlice.actions;

export default videoConfigSlice.reducer;
