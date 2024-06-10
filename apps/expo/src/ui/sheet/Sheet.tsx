import * as React from "react";
//import { useColorScheme } from '~/lib/useColorScheme';
import { useThemeConfig } from "@/core/use-theme-config";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

const Sheet = React.forwardRef<
  BottomSheetModal,
  React.ComponentPropsWithoutRef<typeof BottomSheetModal>
>(
  (
    { index = 0, backgroundStyle, style, handleIndicatorStyle, ...props },
    ref,
  ) => {
    //const { colors } = useColorScheme();
    const { colors } = useThemeConfig();

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      ),
      [],
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        backgroundStyle={
          backgroundStyle ?? {
            backgroundColor: colors.card,
          }
        }
        style={
          style ?? {
            borderWidth: 1,
            borderColor: colors.border,
            borderTopStartRadius: 16,
            borderTopEndRadius: 16,
          }
        }
        handleIndicatorStyle={
          handleIndicatorStyle ?? {
            backgroundColor: colors.border,
          }
        }
        backdropComponent={renderBackdrop}
        {...props}
      />
    );
  },
);

function useSheetRef() {
  return React.useRef<BottomSheetModal>(null);
}

export { Sheet, useSheetRef };
