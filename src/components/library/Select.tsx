import * as React from "react";
import * as SelectComponent from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectComponent.Trigger
> & {
  className?: string;
  children: React.ReactNode;
};

type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof SelectComponent.Content
> & {
  className?: string;
  children: React.ReactNode;
  position?: "popper" | "item-aligned";
};

type SelectLabelProps = React.ComponentPropsWithoutRef<
  typeof SelectComponent.Label
> & {
  className?: string;
};

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectComponent.Item
> & {
  className?: string;
  children: React.ReactNode;
};

type SelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof SelectComponent.Separator
> & {
  className?: string;
};

const Select = SelectComponent.Root;

const SelectGroup = SelectComponent.Group;

const SelectValue = SelectComponent.Value;

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectComponent.Trigger
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-[#45474E] bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`}
      {...props}
    >
      {children}
      <SelectComponent.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectComponent.Icon>
    </SelectComponent.Trigger>
  )
);
SelectTrigger.displayName = SelectComponent.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectComponent.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectComponent.ScrollUpButton
    ref={ref}
    className={`flex cursor-default items-center justify-center py-1 ${className}`}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectComponent.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectComponent.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectComponent.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectComponent.ScrollDownButton
    ref={ref}
    className={`flex cursor-default items-center justify-center py-1 ${className}`}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectComponent.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectComponent.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectComponent.Portal>
      <SelectComponent.Content
        ref={ref}
        className={`relative z-50 max-h-40 min-w-[8rem] overflow-hidden rounded-md border bg-[#37393F] border-[#45474E] text-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 
          ${
            position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
          } ${className}`}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectComponent.Viewport
          className={`p-1 
            ${
              position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            }`}
        >
          {children}
        </SelectComponent.Viewport>
        <SelectScrollDownButton />
      </SelectComponent.Content>
    </SelectComponent.Portal>
  )
);
SelectContent.displayName = SelectComponent.Content.displayName;

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <SelectComponent.Label
      ref={ref}
      className={`py-1.5 pl-8 pr-2 text-sm font-semibold ${className}`}
      {...props}
    />
  )
);
SelectLabel.displayName = SelectComponent.Label.displayName;

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <SelectComponent.Item
      ref={ref}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-[#45474E] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectComponent.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectComponent.ItemIndicator>
      </span>
      <SelectComponent.ItemText>{children}</SelectComponent.ItemText>
    </SelectComponent.Item>
  )
);
SelectItem.displayName = SelectComponent.Item.displayName;

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <SelectComponent.Separator
      ref={ref}
      className={`-mx-1 my-1 h-px bg-muted ${className}`}
      {...props}
    />
  )
);
SelectSeparator.displayName = SelectComponent.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
