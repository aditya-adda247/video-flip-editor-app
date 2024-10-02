import * as React from "react";
import * as SliderComponent from "@radix-ui/react-slider";

type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderComponent.Root
> & {
  className?: string;
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderComponent.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderComponent.Root
    ref={ref}
    className={`relative flex w-full touch-none select-none items-center cursor-pointer ${className}`}
    {...props}
  >
    <SliderComponent.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/20">
      <SliderComponent.Range className="absolute h-full bg-white" />
    </SliderComponent.Track>
    <SliderComponent.Thumb className="block size-3 rounded-full border-2 border-white/10 bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderComponent.Root>
));

Slider.displayName = SliderComponent.Root.displayName;

export { Slider };
