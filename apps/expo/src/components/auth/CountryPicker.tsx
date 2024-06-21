import type { InputControllerType } from "@/ui";
import type { FieldValues } from "react-hook-form";
import type {
  CountryItem,
  ListHeaderComponentProps,
  Style,
} from "react-native-country-codes-picker";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { CheckCircleIcon } from "@/ui/icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

interface ListItemProps {
  selectedItem: string;
  item: CountryItem;
  name: string;
  style?: Style;
  onPress?: (item: CountryItem) => void;
}

const ListItem = React.memo(
  ({ selectedItem, item, name, onPress }: ListItemProps) => {
    function handleOnPress() {
      if (onPress) {
        onPress(item);
      }
    }

    return (
      <TouchableOpacity onPress={handleOnPress} style={styles.buttonContainer}>
        <View style={styles.flexRow}>
          <Text>{item.flag}</Text>
          <Text style={styles.text}>{item.name.en || name}</Text>
        </View>
        {selectedItem === name ? (
          <CheckCircleIcon width={24} height={24} />
        ) : (
          <Ionicons name="ellipse-outline" size={24} color="#d1d5db" />
        )}
      </TouchableOpacity>
    );
  },
);

const ListHeaderComponent = React.memo(
  ({
    countries,
    lang,
    onPress,
    selectedItem,
  }: ListHeaderComponentProps & { selectedItem: string }) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Popular countries</Text>
        {countries.map((country, index) => (
          <ListItem
            key={index}
            item={country}
            onPress={() => onPress(country)}
            name={country.name[lang || "en"]}
            selectedItem={selectedItem}
          />
        ))}
        <Text style={styles.headerText}>Other countries</Text>
      </View>
    );
  },
);

interface SelectProps {
  value?: string | number;
  label?: string;
  disabled?: boolean;
  error?: string;

  onSelect?: (value: string | number) => void;
  placeholder?: string;
  testID?: string;
}

interface CountryPickerInputProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

function CountryPickerInput<T extends FieldValues>(
  props: CountryPickerInputProps<T>,
) {
  const { name, control } = props;
  //const { control } = useFormContext();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handlePickerButtonPress = useCallback((item: CountryItem) => {
    setCountryCode(item.dial_code);
    setSelectedCountry(item.name.en || "");
    setShow(false);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <View>
          <Pressable
            style={styles.pressable}
            onPress={() => setShow(true)}
            className="border-[0.1px] border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          >
            {countryCode ? (
              <Text style={styles.text}>
                {countryCode} {selectedCountry}
              </Text>
            ) : (
              <Text style={styles.placeholderText}>
                Select country of residence
              </Text>
            )}
            <AntDesign name="downcircle" size={24} color="#d1d5db" />
          </Pressable>

          <CountryPicker
            show={show}
            onBackdropPress={() => setShow(false)}
            lang="en"
            popularCountries={["gh", "ng", "ke", "gb", "au", "us", "ca"]}
            style={{
              modal: styles.modal,
              countryButtonStyles: styles.countryButtonStyles,
            }}
            pickerButtonOnPress={(item) => {
              handlePickerButtonPress(item);
              onChange(item.dial_code); // Update the form value
            }}
            ListHeaderComponent={(props) => (
              <ListHeaderComponent
                {...props}
                onPress={(item) => {
                  handlePickerButtonPress(item);
                  onChange(item.dial_code); // Update the form value
                }}
                selectedItem={selectedCountry}
              />
            )}
            itemTemplate={(props) => (
              <ListItem
                {...props}
                onPress={(item) => {
                  handlePickerButtonPress(item);
                  onChange(item.dial_code); // Update the form value
                }}
                selectedItem={selectedCountry}
              />
            )}
          />
        </View>
      )}
    />
  );
}

export default CountryPickerInput;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    gap: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContainer: {
    paddingBottom: 10,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  modal: {
    height: 650,
  },
  countryButtonStyles: {
    backgroundColor: "transparent",
    borderBottomWidth: 0.5,
    borderColor: "#d1d5db",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  headerText: {
    paddingVertical: 8,
    fontWeight: "bold",
  },
});
