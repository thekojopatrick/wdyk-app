import type {
  ItemTemplateProps,
  ListHeaderComponentProps,
} from "react-native-country-codes-picker";
import React, { memo, useCallback, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CountryButton,
  CountryPicker,
} from "react-native-country-codes-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const CustomButton = memo(({ item, name, onPress }: ItemTemplateProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={styles.buttonContainer}
    >
      <View className="flex flex-1 flex-row items-center gap-2">
        <Text>{item?.flag}</Text>
        <Text className="text-lg">{item?.name?.en || name}</Text>
      </View>
      <Ionicons name="ellipse-outline" size={24} color="#d1d5db" />
    </TouchableOpacity>
  );
});

const ListHeaderComponent = memo(
  ({ countries, lang, onPress }: ListHeaderComponentProps) => {
    return (
      <View style={styles.headerContainer}>
        <Text className="py-2 font-semibold">Popular countries</Text>
        {countries?.map((country, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPress(country)}
            style={styles.buttonContainer}
          >
            <View className="flex flex-1 flex-row items-center gap-2">
              <Text>{country?.flag}</Text>
              <Text className="text-lg">{country?.name?.[lang || "en"]}</Text>
            </View>
            <Ionicons name="ellipse-outline" size={24} color="#d1d5db" />
          </TouchableOpacity>
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

  const handlePickerButtonPress = useCallback((item) => {
    setCountryCode(item.dial_code);
    setSelectedCountry(item.name["en"]);
    setShow(false);
  }, []);

  return (
    <View>
      <Pressable style={styles.pressable} onPress={() => setShow(true)}>
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
          <ListHeaderComponent {...props} onPress={handlePickerButtonPress} />
        )}
        itemTemplate={(props) => (
          <CustomButton {...props} onPress={handlePickerButtonPress} />
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
    backgroundColor: "#f5f5f5",
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
