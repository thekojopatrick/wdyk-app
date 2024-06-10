import { ButtonProps, Platform, Pressable, Text, View } from "react-native";
import { Button } from "@/ui";
import { Sheet, useSheetRef } from "@/ui/sheet";
import { AntDesign } from "@expo/vector-icons";

interface SelectCountryProps {
  placeholder: string;
  onValueChange?: (value: string) => void;
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
  countries?: [];
}

export const SelectCountryBottomSheet = (props: SelectCountryProps) => {
  const bottomSheetModalRef = useSheetRef();

  return (
    <View className="items-center">
      <Pressable
        className="flex w-full flex-row items-center justify-between rounded-xl bg-neutral-100 px-4 py-4 font-normal"
        onPress={() => bottomSheetModalRef.current?.present()}
        {...props.buttonProps}
      >
        <Text className="text-neutral-600">{props.placeholder}</Text>
        <AntDesign name="downcircle" size={24} color="#d1d5db" />
      </Pressable>
      <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
        <View className="flex-1 items-center justify-center pb-8">
          <Text>@gorhom/bottom-sheet 🎉</Text>
        </View>
      </Sheet>
    </View>
  );
};
