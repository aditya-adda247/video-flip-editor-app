import { RefObject, useCallback } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoVolumeMedium } from "react-icons/io5";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { aspectRatioOptions, playBackSpeedOptions } from "../constants/consts";
import { formatTimestamp } from "../helpers/utils";
import { AppDispatch, RootState } from "../store/store";
import {
  setCropperRatio,
  setCurrentTime,
  setIsPlaying,
  setPlaybackSpeed,
  setVolume,
} from "../store/videoConfigSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./library/Select";
import { Slider } from "./library/Slider";

interface VideoControlsProps {
  playerRef: RefObject<ReactPlayer>;
}

const VideoControls: React.FC<VideoControlsProps> = ({ playerRef }) => {
  const { videoConfig } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackSpeed,
    cropperRatio,
  } = videoConfig;

  const handlePausePlay = useCallback(() => {
    dispatch(setIsPlaying(!isPlaying));
  }, [dispatch, isPlaying]);

  const handleSeek = useCallback(
    (p: number[]) => {
      if (playerRef.current) {
        playerRef.current.seekTo(p[0]);
      }
      dispatch(setCurrentTime(parseFloat(p[0].toString())));
    },
    [dispatch, playerRef]
  );

  const handleVolume = useCallback(
    (v: number[]) => {
      dispatch(setVolume(v[0]));
    },
    [dispatch]
  );

  const handlePlaybackSpeedChange = useCallback(
    (p: string) => {
      dispatch(setPlaybackSpeed(parseFloat(p)));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col mt-5 gap-4">
      <div className="flex items-center gap-4">
        <div onClick={handlePausePlay} className="cursor-pointer">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <Slider
          value={[currentTime]}
          max={duration}
          onValueChange={handleSeek}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 font-medium text-sm text-white/50">
          <span className="text-white">{formatTimestamp(currentTime)}</span>|
          <span>{formatTimestamp(duration)}</span>
        </div>
        <div className="flex items-center gap-2 w-[20%]">
          <IoVolumeMedium className="size-6" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolume}
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <Select
          value={playbackSpeed.toString()}
          onValueChange={handlePlaybackSpeedChange}
        >
          <SelectTrigger className="w-[190px] text-[#9BA6AB]">
            <span className="text-white">Playback Speed</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {playBackSpeedOptions.map((item) => (
              <SelectItem key={item.value} value={item.value.toString()}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={`${cropperRatio.w}:${cropperRatio.h}`}
          onValueChange={(val) => {
            const [w, h] = val.split(":").map(Number);
            dispatch(setCropperRatio({ w, h }));
          }}
        >
          <SelectTrigger className="text-[#9BA6AB] w-[220px]">
            <span className="text-white">Cropper Aspect Ratio</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {aspectRatioOptions.map((item) => (
              <SelectItem
                key={item.label}
                value={`${item.value.w}:${item.value.h}`}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VideoControls;
