import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Button } from "@/ui";
import { Google } from "@/ui/icons";

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}

export const GoogleAuthButton = forwardRef<TouchableOpacity, ButtonProps>(
  ({ onPress }, ref) => {
    return (
      <Button variant="outline" ref={ref} onPress={onPress} className="gap-3">
        <Google width={20} height={20} />
        <Text>Continue with Google</Text>
      </Button>
    );
  },
);

const styles = {
  button:
    "items-center gap-4 justify-center rounded-full p-4 border  border-charcoal-100 flex-row",
  buttonText: "text-lg font-semibold text-center",
};
