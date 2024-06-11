import type { PressableProps, View } from "react-native";
import type { VariantProps } from "tailwind-variants";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { tv } from "tailwind-variants";

const button = tv({
  slots: {
    container:
      "my-2 flex flex-row items-center justify-center rounded-full px-4",
    label: "font-inter text-base font-semibold",
    indicator: "h-6 text-white",
    border: "rounded-md",
  },

  variants: {
    variant: {
      default: {
        container: "bg-primary dark:bg-white",
        label: "text-white dark:text-black",
        indicator: "text-white dark:text-black",
      },
      secondary: {
        container: "bg-gray-200",
        label: "text-secondary-600",
        indicator: "text-white",
      },
      outline: {
        container: "border border-neutral-400",
        label: "text-black dark:text-neutral-100",
        indicator: "text-black dark:text-neutral-100",
      },
      destructive: {
        container: "bg-red-600",
        label: "text-white",
        indicator: "text-white",
      },
      ghost: {
        container: "bg-transparent",
        label: "text-black underline dark:text-white",
        indicator: "text-black dark:text-white",
      },
      link: {
        container: "bg-transparent",
        label: "text-black",
        indicator: "text-black",
      },
      bezel: {
        container: "bg-primary border border-purple-300 shadow-sm",
        label: "text-white",
        indicator: "text-gray-800",
      },
    },
    size: {
      default: {
        container: "h-12 px-4",
        label: "text-base",
      },
      lg: {
        container: "h-12 px-8",
        label: "text-xl",
      },
      sm: {
        container: "h-8 px-3",
        label: "text-sm",
        indicator: "h-2",
      },
      icon: { container: "h-9 w-9" },
    },
    radius: {
      default: {
        container: "rounded-full",
        border: "rounded-full",
      },
      md: {
        border: "rounded-md",
      },
      sm: {
        border: "rounded-sm",
      },
      full: {
        border: "rounded-full",
      },
    },
    disabled: {
      true: {
        container: "bg-neutral-300 dark:bg-neutral-300",
        label: "text-neutral-600 dark:text-neutral-600",
        indicator: "text-neutral-400 dark:text-neutral-400",
      },
    },
    fullWidth: {
      true: {
        container: "",
      },
      false: {
        container: "self-center",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    disabled: false,
    fullWidth: true,
    size: "default",
    radius: "default",
  },
});
type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, "disabled"> {
  label?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      label: text,
      loading = false,
      variant = "default",
      disabled = false,
      size = "default",
      radius = "default",
      className = "",
      testID,
      textClassName = "",
      ...props
    },
    ref,
  ) => {
    const styles = React.useMemo(
      () => button({ variant, disabled, size, radius }),
      [variant, disabled, size, radius],
    );

    return (
      <Pressable
        disabled={disabled || loading}
        className={styles.container({ className })}
        {...props}
        ref={ref}
        testID={testID}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            {loading ? (
              <ActivityIndicator
                size="small"
                className={styles.indicator()}
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              <Text
                testID={testID ? `${testID}-label` : undefined}
                className={styles.label({ className: textClassName })}
              >
                {text}
              </Text>
            )}
          </>
        )}
      </Pressable>
    );
  },
);
