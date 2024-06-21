import type {
  CountryItem,
  ListHeaderComponentProps,
  Style,
} from "react-native-country-codes-picker";
import React, { memo, useCallback, useState } from "react";
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

interface ListItemProps {
  selectedItem: string;
  item: CountryItem;
  name: string;
  style?: Style;
  onPress?: (item: CountryItem) => void;
}

const ListItem = memo(
  ({ selectedItem, item, name, onPress }: ListItemProps) => {
    function handleOnPress() {
      if (onPress) {
        onPress(item);
      }
    }

    return (
      <TouchableOpacity onPress={handleOnPress} style={styles.buttonContainer}>
        <View className="flex flex-1 flex-row items-center gap-2">
          <Text>{item.flag}</Text>
          <Text className="text-lg">{item.name.en || name}</Text>
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

const ListHeaderComponent = memo(
  ({
    countries,
    lang,
    onPress,
    selectedItem,
  }: ListHeaderComponentProps & { selectedItem: string }) => {
    return (
      <View style={styles.headerContainer}>
        <Text className="py-2 font-semibold">Popular countries</Text>
        {countries.map((country, index) => (
          <ListItem
            key={index}
            item={country}
            onPress={() => onPress(country)}
            name={country.name[lang || "en"]}
            selectedItem={selectedItem}
          />
        ))}
        <Text className="mt-4 py-2 font-semibold">Other countries</Text>
      </View>
    );
  },
);

export default function SelectCountryModal() {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handlePickerButtonPress = useCallback((item: CountryItem) => {
    setCountryCode(item.dial_code);
    setSelectedCountry(item.name.en || "");
    setShow(false);
  }, []);

  return (
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
        pickerButtonOnPress={handlePickerButtonPress}
        ListHeaderComponent={(props) => (
          <ListHeaderComponent
            {...props}
            onPress={handlePickerButtonPress}
            selectedItem={selectedCountry}
          />
        )}
        itemTemplate={(props) => (
          <ListItem
            {...props}
            onPress={handlePickerButtonPress}
            selectedItem={selectedCountry}
          />
        )}
      />
    </View>
  );
}

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
    //backgroundColor: "#f5f5f5",
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
});
