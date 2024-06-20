import { Button, Checkbox, Option, Select, ThemedText } from "@/ui";
import React, { useState } from "react";

import { Link } from "expo-router";
import SelectCountryModal from "./CountryPicker";
import { View } from "react-native";

const CheckboxExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox.Root
      checked={checked}
      onChange={setChecked}
      accessibilityLabel="accept terms of condition"
      className="pb-2"
    >
      <Checkbox.Icon checked={checked} />
      <Checkbox.Label text="checkbox" />
    </Checkbox.Root>
  );
};

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

const SettingUpAccountForm = () => {
  const [country, setSelectedCountry] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("");

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
          <Select
            label="Select your age range"
            value={selectedAgeRange}
            options={ageRangeOptions}
            onSelect={(val) => setSelectedAgeRange(val as string)}
            testID="select"
            placeholder="Select.."
          />
          <Select
            label="How do you identify?"
            value={selectedGender}
            options={genderOptions}
            onSelect={(val) => setSelectedGender(val as string)}
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
            <Button label="Done" onPress={() => {}} />
          </Link>
        </View>
        <View className="my-2 hidden text-center">
          <Link href="/modal" asChild>
            <ThemedText
              variant="subhead"
              className="text-primary-600 text-center font-medium"
            >
              Maybe later
            </ThemedText>
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
