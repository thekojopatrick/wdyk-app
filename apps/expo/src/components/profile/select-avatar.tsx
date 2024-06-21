import { Modal, useModal } from "@/ui/modal";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";

import AvatarList from "./AvatarList";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { FieldValues } from "react-hook-form";
import { FlashList } from "@shopify/flash-list";
import type { InputControllerType } from "@/ui/input";
import type { PressableProps } from "react-native";
import { ThemedText } from "@/ui/text";
import colors from "@/theme/colors";
import { useColorScheme } from "nativewind";
import { useController } from "react-hook-form";

const List = Platform.OS === "web" ? FlashList : BottomSheetFlatList;

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  value?: string | number;
  testID?: string;
}

interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

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
      <Pressable style={styles.option} {...props}>
        <Text style={{ flex: 1 }}>{label}</Text>
        {selected && <Text>Selected</Text>}
      </Pressable>
    );
  },
);

const Options = React.forwardRef<BottomSheetModal, SelectProps>(
  ({ options, onSelect, value, testID }, ref) => {
    const height = options.length * 40 + 100;
    const snapPoints = useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const renderSelectItem = useCallback(
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
          keyExtractor={(item) => `select-item-${item.value}`}
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
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const modal = useModal();

  const { name, control, rules } = props;

  const { field, fieldState } = useController<T>({ control, name, rules });

  const onSelectOption = useCallback(
    (option: Option) => {
      field.onChange(option.value);
      modal.dismiss();
    },
    [modal, field],
  );

  const handleAvatarPress = useCallback(
    (avatarValue: string) => {
      setSelectedAvatar(avatarValue);
      field.onChange(avatarValue);
      modal.present();
    },
    [field, modal],
  );

  return (
    <>
      <View style={styles.wrapper}>
        <ThemedText variant="subhead" testID={`select-avatar-label`}>
          Select Avatar
        </ThemedText>
        <View className="h-full">
          <AvatarList
            selectedValue={selectedAvatar}
            onAvatarPress={handleAvatarPress}
          />
        </View>

        {fieldState.error?.message && (
          <Text testID={`select-avatar-error`} style={styles.errorText}>
            {fieldState.error.message}
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

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  errorText: {
    color: "#f00",
    fontSize: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
});
