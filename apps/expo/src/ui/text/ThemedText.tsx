import * as React from "react";
import { Text as RNText } from "react-native";
import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import { cssInterop } from "nativewind";

cssInterop(RNText, { className: "style" });

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      largeTitle: "text-4xl",
      title1: "text-2xl",
      title2: "text-[22px] leading-7",
      title3: "text-xl",
      heading: "text-[17px] font-semibold leading-6",
      body: "text-[17px] leading-6",
      callout: "text-base",
      subhead: "text-[15px] leading-6",
      footnote: "text-[13px] leading-5",
      caption1: "text-xs",
      caption2: "text-[11px] leading-4",
    },
    color: {
      primary: "",
      secondary: "text-secondary-foreground/90",
      tertiary: "text-muted-foreground/90",
      other: "text-muted-foreground/50",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "primary",
  },
});

const TextClassContext = React.createContext<string | undefined>(undefined);

const ThemedText = React.forwardRef<
  RNText,
  React.ComponentPropsWithoutRef<typeof RNText> &
    VariantProps<typeof textVariants>
>(({ className, variant, color, ...props }, ref) => {
  const textClassName = React.useContext(TextClassContext);
  return (
    <RNText
      ref={ref}
      className={cn(textVariants({ variant, color }), textClassName, className)}
      {...props}
    />
  );
});

export { ThemedText, TextClassContext, textVariants };
