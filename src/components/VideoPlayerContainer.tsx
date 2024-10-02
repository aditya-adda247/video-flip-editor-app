import { useCallback, useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { BsYoutube } from "react-icons/bs";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { video_url } from "../constants/consts";
import { setRecordedData } from "../store/recordedDataSlice";
import { RootState } from "../store/store";
import {
  setCurrentTime,
  setDuration,
  setOverlayPosition,
  setVideoConfig,
} from "../store/videoConfigSlice";
import VideoControls from "./VideoControls";

export const VideoPlayerContainer = () => {
  const playerWrapperRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReactPlayer | null>(null);
  const previewPlayerRef = useRef<ReactPlayer | null>(null);
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const { videoConfig, recordedDataState } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const [previewVideoLoaded, setPreviewVideoLoaded] = useState(false);

  const {
    isPlaying,
    volume,
    playbackSpeed,
    cropperRatio,
    isOverlayActive,
    overlayPosition,
    currentTime,
    overlaySize,
    videoPlayer,
  } = videoConfig;

  const updateOverlaySize = useCallback(() => {
    if (playerWrapperRef.current) {
      const { clientWidth, clientHeight } = playerWrapperRef.current;
      const aspectRatio = cropperRatio.w / cropperRatio.h;
      const newHeight = clientHeight;
      const newWidth = newHeight * aspectRatio;
      if (draggableRef.current) {
        draggableRef.current.style.width = newWidth.toString();
        draggableRef.current.style.height = newHeight.toString();
      }

      dispatch(
        setVideoConfig({
          videoPlayer: { width: clientWidth, height: clientHeight },
          overlaySize: { width: newWidth, height: newHeight },
          overlayPosition: { x: (clientWidth - newWidth) / 2, y: 0 },
        })
      );
    }
  }, [cropperRatio, dispatch]);

  useEffect(() => {
    updateOverlaySize();
    window.addEventListener("resize", updateOverlaySize);
    return () => window.removeEventListener("resize", updateOverlaySize);
  }, [cropperRatio, updateOverlaySize]);

  const handleDuration = useCallback(
    (duration: number) => {
      dispatch(setDuration(duration));
    },
    [dispatch]
  );

  const handleProgress = useCallback(
    (val: { playedSeconds: number }) => {
      dispatch(setCurrentTime(val?.playedSeconds));

      if (isOverlayActive) {
        dispatch(
          setRecordedData([
            ...recordedDataState.recordedData,
            {
              timeStamp: currentTime,
              coordinates: [
                overlayPosition.x,
                overlayPosition.y,
                overlaySize.width,
                overlaySize.height,
              ],
              volume: volume,
              playbackRate: playbackSpeed,
            },
          ])
        );
      }
    },
    [
      currentTime,
      dispatch,
      isOverlayActive,
      overlayPosition.x,
      overlayPosition.y,
      overlaySize.height,
      overlaySize.width,
      playbackSpeed,
      recordedDataState.recordedData,
      volume,
    ]
  );

  const handleDrag = useCallback(
    (e: DraggableEvent, ui: DraggableData) => {
      const { x, y } = ui;
      dispatch(setOverlayPosition({ x, y }));
    },
    [dispatch]
  );

  useEffect(() => {
    previewPlayerRef.current?.seekTo(currentTime);
  }, [currentTime]);

  return (
    <div className="w-11/12 container grid grid-cols-2 gap-20 mt-5">
      <div className="flex flex-col w-full">
        <div ref={playerWrapperRef} className="relative w-full">
          <ReactPlayer
            ref={playerRef}
            url={video_url}
            playing={isPlaying}
            volume={volume}
            loop={false}
            playbackRate={playbackSpeed}
            onDuration={handleDuration}
            onProgress={handleProgress}
            onReady={() => updateOverlaySize()}
            width="100%"
            height="100%"
            style={{
              borderRadius: "10px",
              overflow: "hidden",
            }}
          />
          {isOverlayActive && (
            <div className="absolute top-0 left-0 z-50 w-full h-full">
              <Draggable
                nodeRef={draggableRef}
                position={overlayPosition}
                onDrag={handleDrag}
                bounds="parent"
                axis="both"
              >
                <div
                  ref={draggableRef}
                  className="bg-black bg-opacity-50 cursor-move grid grid-cols-3 grid-rows-3"
                  style={{
                    width: overlaySize.width,
                    height: overlaySize.height,
                  }}
                >
                  {[...Array(9)].map((_, index) => (
                    <div
                      key={index}
                      className="border border-dashed border-white"
                    />
                  ))}
                </div>
              </Draggable>
            </div>
          )}
        </div>
        <VideoControls playerRef={playerRef} />
      </div>
      <div className="flex flex-col items-center">
        <h4 className="text-center font-semibold text-sm text-white/50 tracking-wider">
          Preview
        </h4>
        {!videoConfig.isOverlayActive ? (
          <div className="flex flex-col">
            <div className="flex flex-col items-center text-center text-sm mt-32">
              <BsYoutube className="size-8" />
              <p className="mt-2.5">Preview not available</p>
              <p className="text-white/50 mt-2">
                Please click on “Start Cropper” <br /> and then play video
              </p>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: overlaySize.width,
              height: overlaySize.height,
              overflow: "hidden",
              position: "relative",
            }}
            className={`mt-5 ${!previewVideoLoaded ? "hidden" : ""}`}
          >
            <ReactPlayer
              ref={previewPlayerRef}
              url={video_url}
              playing={isPlaying}
              onReady={() => setPreviewVideoLoaded(true)}
              volume={0}
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
        )}
      </div>
    </div>
  );
};

export default VideoPlayerContainer;
