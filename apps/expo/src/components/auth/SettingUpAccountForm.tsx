import type { Option } from "@/ui";
import React from "react";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button, ControlledSelect, ThemedText } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SelectCountryModal from "./CountryPicker";

const genderOptions: Option[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "self-identity", label: "Self Identity" },
];
const ageRangeOptions: Option[] = [
  { value: "5-10", label: "5-10" },
  { value: "11-15", label: "10-15" },
  { value: "16-18", label: "15-18" },
  { value: "19-24", label: "18-24" },
  { value: "25-above", label: "25-above" },
];

const schema = z.object({
  country: z.string().optional(),
  age_range: z.string().optional(),
  gender_identity: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

const SettingUpAccountForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,

    formState: { isSubmitting, isLoading, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    // Proceed with form submission
    console.log(data);
    //router.push("/account/setting-up-account");
  };

  return (
    <View className="flex-1">
      <View className="mb-4 gap-2">
        <ThemedText variant="title1" testID="form-title" className="font-bold">
          Tell us about yourself
        </ThemedText>
        <ThemedText testID="form-description" className="pb-6">
          Share some details to personalize your wordy journey.
        </ThemedText>
      </View>
      <View className="flex-1">
        <View className="gap-5">
          <View>
            <ThemedText
              variant="subhead"
              testID="email-ID"
              className={styles.label}
            >
              Country of residence
            </ThemedText>
            <SelectCountryModal />
          </View>
          <ControlledSelect
            name="age_range"
            control={control}
            label="Select your age range"
            options={ageRangeOptions}
            testID="select"
            placeholder="Select.."
          />
          <ControlledSelect
            name="gender_identity"
            label="How do you identify?"
            options={genderOptions}
            control={control}
            testID="select"
            placeholder="Select.."
          />
        </View>

        <View className="mt-auto w-full gap-4 text-center">
          <Link
            replace
            href={{
              pathname: "/(tabs)/",
              params: { name: "Kojo" },
            }}
            asChild
          >
            <Button
              label="Done"
              loading={isSubmitting || isLoading}
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = {
  label: "text-grey-100 mb-2 text-lg dark:text-neutral-100",
  input: `mt-0 py-4 rounded-xl border-[0.1px] border-neutral-300 bg-neutral-100 
  px-4 text-base font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white`,
};

export default SettingUpAccountForm;
