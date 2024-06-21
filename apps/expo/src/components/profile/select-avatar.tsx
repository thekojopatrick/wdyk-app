import type { InputControllerType } from "@/ui/input";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { FieldValues } from "react-hook-form";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "@/theme/colors";
import { Modal, useModal } from "@/ui/modal";
import { ThemedText } from "@/ui/text";
import { useColorScheme } from "nativewind";
import { useController } from "react-hook-form";

import AvatarList from "./AvatarList";
import CustomizeAvatar from "./CustomizeAvatar";

interface SelectProps {
  selected: string;
  onSelect: () => void;
  testID?: string;
}

interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

const SelectedAvatar = React.forwardRef<BottomSheetModal, SelectProps>(
  ({ selected, onSelect, testID }, ref) => {
    //const height = 3 * 50 + 100;
    //const snapPoints = useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={["50%"]}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
      >
        <CustomizeAvatar
          selected={selected}
          testID={testID}
          onPress={() => onSelect()}
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

  const handleAvatarChanged = useCallback(() => {
    modal.dismiss();
  }, [modal]);

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
            selectedAvatar={selectedAvatar}
            onAvatarPress={handleAvatarPress}
          />
        </View>
        {fieldState.error?.message && (
          <Text testID={`select-avatar-error`} style={styles.errorText}>
            {fieldState.error.message}
          </Text>
        )}
      </View>
      <SelectedAvatar
        testID={"select-avatar-modal"}
        ref={modal.ref}
        selected={selectedAvatar}
        onSelect={handleAvatarChanged}
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
