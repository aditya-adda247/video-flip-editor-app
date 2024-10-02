import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSelectedTab } from "../store/tabSlice";

const Header: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.selectedTab);
  const dispatch = useDispatch();

  return (
    <nav className="w-11/12 container flex justify-between py-7">
      <h3 className="font-bold">Cropper</h3>
      <div className="flex items-center p-1 bg-[#45474E] rounded-md text-sm">
        <button
          className={`px-3 py-1.5 cursor-pointer ${
            selectedTab === "preview-tab" ? "bg-[#37393F] rounded-md" : ""
          }`}
          onClick={() => dispatch(setSelectedTab("preview-tab"))}
        >
          Preview Session
        </button>
        <button
          className={`px-3 py-1.5 cursor-pointer ${
            selectedTab === "generate-tab" ? "bg-[#37393F] rounded-md" : ""
          }`}
          onClick={() => dispatch(setSelectedTab("generate-tab"))}
        >
          Generate Session
        </button>
      </div>
      <div></div>
    </nav>
  );
};

export default Header;
