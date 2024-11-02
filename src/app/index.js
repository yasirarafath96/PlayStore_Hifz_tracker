import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
    <SafeAreaView>
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity >
          <FontAwesome name="user-circle" size={30} color="black" />
        </TouchableOpacity>
      </View> */}

      <View style={styles.body}>
        
      </View>
    </SafeAreaView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'orange'
  },
});
