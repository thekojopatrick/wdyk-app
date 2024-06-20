import React from "react";
import { useRouter } from "expo-router";
import {
  Button,
  ControlledInput,
  ControlledSelect,
  ThemedText,
  View,
} from "@/ui";
import { Adinkrahene, Sankofa } from "@/ui/icons/adinkra-symbols";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectAvatar } from "../profile/select-avatar";

const schema = z.object({
  username: z.string({ message: "Username must be more than 2 characters" }),
  user_symbol: z.string().optional(),
  avatar_url: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

//TODO:Use flatlist to display symbols
//Todo: On tap on sybmol open bottomsheet to customize symbol
//Todo: Show selected symbol

const SettingUpProfileForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, isLoading, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    console.log(data);
    //router.push("/account/setting-up-account");
  };

  return (
    <View className="flex-1">
      <View className="mb-6 gap-2">
        <ThemedText variant="title1" testID="form-title" className="font-bold">
          Complete your profile
        </ThemedText>
        <ThemedText
          testID="form-description"
          className="font-normal text-neutral-500 dark:text-neutral-100"
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
          placeholder="Pick a unique username"
        />
        <ThemedText
          testID="form-description"
          variant="footnote"
          className="mb-6 text-neutral-500 dark:text-white"
        >
          Username can contain only lowercase letters and underscore
        </ThemedText>
        <SelectAvatar name="user_symbol" control={control} />
      </View>
      <Button
        label="Continue"
        className="mt-auto"
        loading={isSubmitting || isLoading}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default SettingUpProfileForm;
