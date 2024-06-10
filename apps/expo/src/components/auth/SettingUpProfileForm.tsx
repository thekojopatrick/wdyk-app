import React from "react";
import { Text, View } from "react-native";
import { ControlledInput, ThemeText } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().optional(),
});
type FormType = z.infer<typeof schema>;

const SettingUpProfileForm = () => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <View>
      <View className="mb-5 gap-2">
        <ThemeText variant="title1" testID="form-title" className="font-bold">
          Complete your profile
        </ThemeText>
        <ThemeText testID="form-description" className="pb-6">
          Personalize your wordy journey.
        </ThemeText>
      </View>
      <ControlledInput
        testID="username"
        control={control}
        name="username"
        label="Username"
        placeholder="@username"
      />
    </View>
  );
};

export default SettingUpProfileForm;
