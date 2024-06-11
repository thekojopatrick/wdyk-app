import type { SvgProps } from "react-native-svg";
import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import colors from "@/theme/colors";

export const NewStar = ({
  color = colors.neutral[500],
  ...props
}: SvgProps) => {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M2 11C6.5 11 11 6.5 11 2C11 6.5 15.5 11 20 11C15.5 11 11 15.5 11 20C11 15.5 6.5 11 2 11ZM1 18.5C1.833 18.5 3.5 16.833 3.5 16C3.5 16.833 5.167 18.5 6 18.5C5.167 18.5 3.5 20.167 3.5 21C3.5 20.167 1.833 18.5 1 18.5ZM15 4C16 4 18 2 18 1C18 2 20 4 21 4C20 4 18 6 18 7C18 6 16 4 15 4Z"
        stroke="#030712"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
