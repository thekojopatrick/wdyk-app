import type { SubmitHandler } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Button, ControlledInput, ThemedText, View } from "@/ui";
import { supabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectAvatar } from "../profile/select-avatar";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be more than 2 characters" }),
  user_symbol: z.string({ message: "Pick your wordy persona" }),
  avatar_url: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

export interface SettingUpProfileFormProps {
  onSubmit?: SubmitHandler<FormType>;
}
const suggestUsernames = (
  base: string,
  existingUsernames: string[],
): string[] => {
  const suggestions: string[] = [];
  for (let i = 1; suggestions.length < 5; i++) {
    const suggestion = `${base}${i}`;
    if (!existingUsernames.includes(suggestion)) {
      suggestions.push(suggestion);
    }
  }
  return suggestions;
};

const checkUsernameExists = async (username: string): Promise<boolean> => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username);

  if (error) console.error("Error fetching data:", error);

  return profiles ? profiles.length > 0 : false;
};

const SettingUpProfileForm = ({
  onSubmit = () => {},
}: SettingUpProfileFormProps) => {
  const [usernameExists, setUsernameExists] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, isLoading, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const username = watch("username");

  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        const exists = await checkUsernameExists(username);
        setUsernameExists(exists);

        if (exists) {
          // Fetch all usernames to avoid conflicts in suggestions
          const { data: profiles, error } = await supabase
            .from("profiles")
            .select("username");
          const existingUsernames =
            profiles?.map(
              (profile: { username: string }) => profile.username,
            ) ?? [];

          if (error) console.error("Error fetching data:", error);

          setSuggestions(suggestUsernames(username, existingUsernames));
        } else {
          setSuggestions([]);
        }
      }
    };

    void checkUsername();
  }, [username]);

  // const onSubmit = (data: FormType) => {
  //   if (!usernameExists) {
  //     // Proceed with form submission
  //     console.log(data);
  //     router.push("/account/setting-up-account");
  //   }
  // };

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
        {usernameExists && (
          <View className="mb-4">
            <ThemedText
              testID="username-error"
              className="mb-2 text-red-500"
              variant={"callout"}
            >
              Username already exists. Here are some suggestions:
            </ThemedText>
            <View className="flex flex-row flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <View
                  key={suggestion}
                  className="rounded-full bg-gray-100 px-2"
                  testID={`suggestion-${suggestion}`}
                >
                  <ThemedText variant={"callout"}>{suggestion}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}
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
