import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportToJson } from "../helpers/utils";
import { setRecordedData } from "../store/recordedDataSlice";
import { RootState } from "../store/store";
import { setSelectedTab } from "../store/tabSlice";
import { setIsOverlayActive } from "../store/videoConfigSlice";

const Footer: React.FC = () => {
  const {
    videoConfig,
    recordedDataState: { recordedData },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const downloadPreview = useCallback(() => {
    exportToJson(recordedData);
  }, [recordedData]);

  const cancelPreview = useCallback(() => {
    dispatch(setRecordedData([]));
    dispatch(setSelectedTab("generate-tab"));
  }, [dispatch]);

  return (
    <div className="py-7 border-t border-[#494C55]">
      <div className="w-11/12 container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="btn"
            disabled={videoConfig.isOverlayActive}
            onClick={() => dispatch(setIsOverlayActive(true))}
          >
            Start Cropper
          </button>
          <button
            className="btn"
            disabled={!videoConfig.isOverlayActive}
            onClick={() => dispatch(setIsOverlayActive(false))}
          >
            Remove Cropper
          </button>
          <button
            className="btn"
            disabled={recordedData?.length === 0}
            onClick={downloadPreview}
          >
            Generate Preview
          </button>
        </div>
        <div>
          <button className="btn bg-[#45474E] px-5" onClick={cancelPreview}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
