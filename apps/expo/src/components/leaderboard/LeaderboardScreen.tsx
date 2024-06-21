// src/screens/LeaderboardScreen.js

import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { cssInterop } from "nativewind";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});
function AvatarExample() {
  const TWITTER_AVATAR_URI =
    "https://pbs.twimg.com/profile_images/1782428433898708992/1voyv4_A_400x400.jpg";
  return (
    <View className="items-center">
      <Avatar alt="NativeWindUI Avatar">
        <AvatarImage source={{ uri: TWITTER_AVATAR_URI }} />
        <AvatarFallback>
          <Text>NUI</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}

interface ComponentItem {
  name: string;
  points: number;
  avatar: string;
  rank: number;
}

function keyExtractor(item: ComponentItem) {
  return item.name;
}

function renderItem({ item }: { item: ComponentItem }) {
  return (
    <View style={styles.user}>
      <Text style={styles.userRank}>{item.rank}</Text>
      <AvatarExample />
      <Text style={styles.userName}>{item.name}</Text>
      <View style={styles.userPoints} className="rounded-full">
        <FontAwesome name="bolt" color="#FFD700" />
        <Text>{item.points}</Text>
      </View>
    </View>
  );
}

const LeaderboardScreen = ({ data, topRank }) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.topUsers}>
          {topRank.map((user, index) => (
            <View key={index} style={styles.topUser}>
              <AvatarExample />
              <Text style={styles.topUserText}>{user.name}</Text>
              <Text style={styles.topUserPoints}>{user.points}</Text>
              <FontAwesome name="bolt" color="#FFD700" />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.userList}>
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={100}
          contentContainerClassName="py-4 android:pb-12"
          keyExtractor={keyExtractor}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: colors.primary[600],
    padding: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
  },
  topUsers: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  topUser: {
    alignItems: "center",
  },
  topUserText: {
    color: "#fff",
    fontSize: 16,
  },
  topUserPoints: {
    color: "#fff",
    fontSize: 16,
  },
  userList: {
    padding: 20,
    height: Dimensions.get("screen").height - 348,
    width: Dimensions.get("screen").width,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userRank: {
    fontSize: 20,
    width: 30,
  },
  userName: {
    flex: 1,
    marginLeft: 10,
  },
  userPoints: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: colors.secondary[100],
  },
});

export default LeaderboardScreen;
