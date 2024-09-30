type PlayBackSpeedOption = {
    value: number;
    label: string;
  };
  
  export const playBackSpeedOptions: PlayBackSpeedOption[] = [
    {
      value: 0.5,
      label: "0.5x",
    },
    {
      value: 1,
      label: "1x",
    },
    {
      value: 1.5,
      label: "1.5x",
    },
    {
      value: 2,
      label: "2x",
    },
  ];
  
  export type AspectRatio = {
    w: number;
    h: number;
  };
  
  type AspectRatioOption = {
    value: AspectRatio;
    label: string;
  };
  
  export const aspectRatioOptions: AspectRatioOption[] = [
    { value: { w: 9, h: 18 }, label: "9:18" },
    { value: { w: 9, h: 16 }, label: "9:16" },
    { value: { w: 4, h: 3 }, label: "4:3" },
    { value: { w: 3, h: 4 }, label: "3:4" },
    { value: { w: 1, h: 1 }, label: "1:1" },
    { value: { w: 4, h: 5 }, label: "4:5" },
  ];
  