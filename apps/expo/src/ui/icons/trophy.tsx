import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function Trophy({ color = "#000", ...props }: SvgProps) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M12.6666 17C10.993 17 9.53634 18.265 8.78429 20.1312C8.42509 21.0225 8.94052 22 9.6254 22H15.7078C16.3927 22 16.9081 21.0225 16.5489 20.1312C15.7969 18.265 14.3402 17 12.6666 17Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M19.1666 5H20.3688C21.5697 5 22.1701 5 22.4834 5.37736C22.7966 5.75472 22.6664 6.32113 22.4059 7.45395L22.0151 9.15307C21.4275 11.7086 19.2775 13.6088 16.6666 14"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.16663 5H4.96442C3.76355 5 3.16312 5 2.84987 5.37736C2.53662 5.75472 2.66687 6.32113 2.92738 7.45395L3.31811 9.15307C3.90577 11.7086 6.05575 13.6088 8.66663 14"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.6666 17C15.6874 17 18.2316 12.3379 18.9963 5.99089C19.2078 4.23558 19.3136 3.35793 18.7534 2.67896C18.1933 2 17.2889 2 15.48 2H9.85321C8.04438 2 7.13996 2 6.5798 2.67896C6.01964 3.35793 6.12538 4.23558 6.33688 5.99089C7.10163 12.3379 9.64586 17 12.6666 17Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
