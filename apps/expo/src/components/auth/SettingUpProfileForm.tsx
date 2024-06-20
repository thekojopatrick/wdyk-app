import React from "react";
import { ControlledInput, ThemedText, View } from "@/ui";
import { Adinkrahene, Sankofa } from "@/ui/icons/adinkra-symbols";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

//TODO:Use flatlist to display symbols
//Todo: On tap on sybmol open bottomsheet to customize symbol
//Todo: Show selected symbol

const SettingUpProfileForm = () => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <View>
      <View className="mb-6 gap-2">
        <ThemedText variant="title1" testID="form-title" className="font-bold">
          Complete your profile
        </ThemedText>
        <ThemedText
          testID="form-description"
          className="font-normal text-neutral-500"
        >
          Personalize your profile to stand out.
        </ThemedText>
      </View>
      <View className="mb-3">
        <ControlledInput
          testID="username"
          control={control}
          name="username"
          label="Username"
          placeholder="@username"
        />
      </View>
      <View>
        <ThemedText variant="subhead" testID="form-label" className="">
          Pick Your Wordy Persona!
        </ThemedText>
        <View className="mt-3 flex flex-row flex-wrap gap-2">
          <View className="h-24 w-24 items-center justify-center rounded-xl bg-neutral-100 p-4">
            <Adinkrahene />
          </View>
          <View className="h-24 w-24 items-center justify-center rounded-xl bg-neutral-100 p-4">
            <Sankofa />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingUpProfileForm;
