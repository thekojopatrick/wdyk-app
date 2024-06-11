import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

export const LockIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M16 3C12.155 3 9 6.155 9 10V12.875C8.05068 13.803 7.2963 14.9113 6.78114 16.1348C6.26597 17.3583 6.0004 18.6724 6 20C6 25.51 10.49 30 16 30C21.51 30 26 25.51 26 20C25.9996 18.6724 25.734 17.3583 25.2189 16.1348C24.7037 14.9113 23.9493 13.803 23 12.875V10C23 6.155 19.845 3 16 3ZM16 5C18.755 5 21 7.245 21 10V11.375C19.525 10.515 17.826 10 16 10C14.174 10 12.475 10.516 11 11.375V10C11 7.245 13.245 5 16 5ZM16 12C20.43 12 24 15.57 24 20C24 24.43 20.43 28 16 28C11.57 28 8 24.43 8 20C8 15.57 11.57 12 16 12ZM16 18C15.4696 18 14.9609 18.2107 14.5858 18.5858C14.2107 18.9609 14 19.4696 14 20C14 20.74 14.403 21.373 15 21.72V25H17V21.72C17.597 21.373 18 20.74 18 20C18 19.4696 17.7893 18.9609 17.4142 18.5858C17.0391 18.2107 16.5304 18 16 18Z"
        fill="#6229FF"
      />
    </Svg>
  );
};