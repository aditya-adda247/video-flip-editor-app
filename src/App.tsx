import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Header from "./components/Header";
import VideoPlayerContainer from "./components/VideoPlayerContainer";
import PreviewContainer from "./components/PreviewContainer";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const { selectedTab } = useSelector((state: RootState) => state.selectedTab);

  return (
    <main className="h-screen flex flex-col justify-between bg-vfe-bg-primary text-white">
      <div>
        <Header />
        {selectedTab === "generate-tab" ? <VideoPlayerContainer /> : null}
        {selectedTab === "preview-tab" ? <PreviewContainer /> : null}
      </div>

      {selectedTab === "generate-tab" ? <Footer /> : null}
    </main>
  );
};

export default App;
