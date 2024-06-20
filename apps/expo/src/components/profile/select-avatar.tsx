import type { InputControllerType } from "@/ui/input";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { FieldValues } from "react-hook-form";
import type { PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";
import * as React from "react";
import { Platform, Pressable, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import colors from "@/theme/colors";
import { CaretDown } from "@/ui/icons";
import { Adinkrahene } from "@/ui/icons/adinkra-symbols";
import { Modal, useModal } from "@/ui/modal";
import { Text, ThemedText } from "@/ui/text";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useColorScheme } from "nativewind";
import { useController } from "react-hook-form";
import { tv } from "tailwind-variants";

const List = Platform.OS === "web" ? FlashList : BottomSheetFlatList;

interface Option {
  label: string;
  value: string | number;
}

interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

type OptionsProps = {
  options: Option[];
  onSelect: (option: Option) => void;
  value?: string | number;
  testID?: string;
};

function keyExtractor(item: Option) {
  return `select-item-${item.value}`;
}

const Option = React.memo(
  ({
    label,
    selected = false,
    ...props
  }: PressableProps & {
    selected?: boolean;
    label: string;
  }) => {
    return (
      <Pressable
        className="flex-row items-center border-b-[1px] border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
        {...props}
      >
        <Text className="flex-1 dark:text-neutral-100 ">{label}</Text>
        {selected && <Text>Selected</Text>}
      </Pressable>
    );
  },
);

const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  ({ options, onSelect, value, testID }, ref) => {
    const height = options.length * 40 + 100;
    const snapPoints = React.useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const renderSelectItem = React.useCallback(
      ({ item }: { item: Option }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          selected={value === item.value}
          onPress={() => onSelect(item)}
          testID={testID ? `${testID}-item-${item.value}` : undefined}
        />
      ),
      [onSelect, value, testID],
    );

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
      >
        <List
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
          testID={testID ? `${testID}-modal` : undefined}
          estimatedItemSize={52}
        />
      </Modal>
    );
  },
);

export function SelectAvatar<T extends FieldValues>(
  props: ControlledSelectProps<T>,
) {
  const [selected, setSelected] = React.useState<Option | null>(null);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const modal = useModal();

  const { name, control, rules, ...selectProps } = props;

  const { field, fieldState } = useController<T>({ control, name, rules });

  const onSelectOption = React.useCallback(
    (option: Option) => {
      setSelected(option?.value);
      console.log({ selected });
      onSelect?.(option.value);
      modal.dismiss();
    },
    [modal],
  );

  const onSelect = () => {
    if (selected.value !== "") {
      console.log({ selected });
    }
  };

  return (
    <>
      <View className="gap-4">
        <ThemedText variant="subhead" testID={`select-avatar-label`}>
          Pick Your Wordy Persona!
        </ThemedText>
        <TouchableOpacity
          className={""}
          disabled={disabled}
          onPress={modal.present}
          testID={`select-avatar-trigger`}
        >
          <View className="h-24 w-24 items-center justify-center rounded-xl bg-neutral-100 p-4">
            <Adinkrahene />
          </View>
        </TouchableOpacity>
        {fieldState.error?.message && (
          <Text
            testID={`select-avatar-error`}
            className="text-danger-300 dark:text-danger-600 text-sm"
          >
            {fieldState.error?.message}
          </Text>
        )}
      </View>
      <Options
        testID={"select-avatar-modal"}
        ref={modal.ref}
        options={[]}
        onSelect={onSelectOption}
      />
    </>
  );
}
