import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Circle } from "react-native-svg";

export const Dashboard = ({ color = "#000", ...props }: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={color}
    fill={"none"}
    {...props}
  >
    <Circle
      cx="17.75"
      cy="6.25"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <Circle
      cx="6.25"
      cy="6.25"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <Circle
      cx="17.75"
      cy="17.75"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <Circle
      cx="6.25"
      cy="17.75"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </Svg>
);
