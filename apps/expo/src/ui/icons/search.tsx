import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Search = ({ color = "#000", ...props }: SvgProps) => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M17.8333 17.5L22.3333 22M20.3333 11C20.3333 8.61305 19.385 6.32387 17.6972 4.63604C16.0094 2.94821 13.7202 2 11.3333 2C8.9463 2 6.65712 2.94821 4.96929 4.63604C3.28146 6.32387 2.33325 8.61305 2.33325 11C2.33325 13.3869 3.28146 15.6761 4.96929 17.364C6.65712 19.0518 8.9463 20 11.3333 20C13.7202 20 16.0094 19.0518 17.6972 17.364C19.385 15.6761 20.3333 13.3869 20.3333 11Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
