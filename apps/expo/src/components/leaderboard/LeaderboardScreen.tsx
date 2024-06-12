// src/screens/LeaderboardScreen.js

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { FontAwesome } from "@expo/vector-icons";

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

const LeaderboardScreen = ({ navigation }) => {
  const topUsers = [
    { name: "Arlene McCoy", points: 250, avatar: "heart", rank: 3 },
    { name: "Guy Hawkins", points: 305, avatar: "adinkrahene", rank: 1 },
    { name: "Dianne Russell", points: 195, avatar: "snowflake", rank: 2 },
  ];

  const users = [
    { name: "Arlene McCoy", points: 305, avatar: "heart", rank: 1 },
    { name: "Guy Hawkins", points: 305, avatar: "heart", rank: 2 },
    { name: "Dianne Russell", points: 305, avatar: "snowflake", rank: 3 },
    { name: "Jenny Wilson", points: 305, avatar: "target", rank: 4 },
    { name: "Courtney Henry", points: 305, avatar: "spiral", rank: 5 },
    { name: "Robert Fox", points: 305, avatar: "calendar", rank: 6 },
    { name: "Brooklyn Simmons", points: 305, avatar: "magnifier", rank: 7 },
    { name: "Ralph Edwards", points: 305, avatar: "adinkrahene", rank: 8 },
  ];

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Leaderboard</Text>
        <View style={styles.tabs}>
          <Text
            style={styles.tabText}
            onPress={() => navigation.navigate("/(tabs)/leaderboard/")}
          >
            WEEKLY
          </Text>
          <Text
            style={styles.tabText}
            onPress={() => navigation.navigate("/(tabs)/leaderboard/all-time")}
          >
            ALL TIME
          </Text>
        </View>
        <View style={styles.topUsers}>
          {topUsers.map((user, index) => (
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
        {users.map((user, index) => (
          <View key={index} style={styles.user}>
            <AvatarExample />
            <Text style={styles.userRank}>{user.rank}</Text>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.userPoints}>
              <Text>{user.points}</Text>
              <FontAwesome name="bolt" color="#FFD700" />
            </View>
          </View>
        ))}
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
  },
});

export default LeaderboardScreen;
