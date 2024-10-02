import { RotateCcwIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { video_url } from "../constants/consts";
import { sleep } from "../helpers/utils";
import { RecordedData } from "../store/recordedDataSlice";
import { RootState } from "../store/store";

const PreviewContainer: React.FC = () => {
  const {
    videoConfig,
    recordedDataState: { recordedData },
  } = useSelector((state: RootState) => state);
  const { videoPlayer } = videoConfig;

  const playerRef = useRef<ReactPlayer | null>(null);

  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [overlaySize, setOverlaySize] = useState({ width: 0, height: 0 });
  const [volume, setVolume] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);

  const onStart = useCallback(async () => {
    for (let index = 0; index < recordedData.length; index++) {
      setIsPlaying(true);
      setCurrentFrame(index + 1);
      const item: RecordedData = recordedData[index];
      playerRef?.current?.seekTo(item.timeStamp);
      setOverlayPosition({
        x: item.coordinates[0],
        y: item.coordinates[1],
      });
      setOverlaySize({
        width: item.coordinates[2],
        height: item.coordinates[3],
      });
      setVolume(item.volume);
      setPlaybackSpeed(item.playbackRate);
      await sleep(1000);
      setIsPlaying(false);
    }
  }, [
    recordedData,
    playerRef,
    setIsPlaying,
    setCurrentFrame,
    setOverlayPosition,
    setOverlaySize,
    setVolume,
    setPlaybackSpeed,
  ]);

  useEffect(() => {
    onStart();
  }, [onStart]);

  const restartPreview = useCallback(() => {
    setCurrentFrame(1);
    onStart();
  }, [onStart]);

  return (
    <div className="w-11/12 container grid grid-cols-2 gap-20 mt-16">
      <div className="flex flex-col items-center w-full text-sm">
        <div className="flex items-center gap-5">
          <h3 className="bg-[#45474E] p-2 rounded-md">
            Frame {currentFrame} of {recordedData.length}
          </h3>
          <RotateCcwIcon
            onClick={restartPreview}
            className="size-5 cursor-pointer"
          />
        </div>

        <pre className="bg-[#45474E] p-4 mt-4 rounded-md">
          <code>{JSON.stringify(recordedData[currentFrame - 1], null, 2)}</code>
        </pre>
      </div>
      <div className="flex flex-col w-full items-center">
        <div
          style={{
            width: overlaySize.width,
            height: overlaySize.height,
            overflow: "hidden",
            position: "relative",
          }}
          className="mt-5"
        >
          <ReactPlayer
            ref={playerRef}
            url={video_url}
            playing={isPlaying}
            onReady={(player) => {
              playerRef.current = player;
            }}
            volume={volume}
            playbackRate={playbackSpeed}
            width={videoPlayer.width}
            height={videoPlayer.height}
            style={{
              position: "absolute",
              top: `-${overlayPosition.y}px`,
              left: `-${overlayPosition.x}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewContainer;
