import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export const CheckCircleIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        fill="#6229FF"
      />
      <Path
        d="M5.5 8L7.394 9.894C7.42213 9.92209 7.46025 9.93787 7.5 9.93787C7.53975 9.93787 7.57787 9.92209 7.606 9.894L11.5 6"
        stroke="white"
        stroke-width="1.2"
      />
    </Svg>
  );
};
