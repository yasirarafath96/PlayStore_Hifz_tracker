import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const Summary = () => {
  const data = [
    {
      juzz: "1",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
      totalTime: "7 days",
    },
    {
      juzz: "2",
      startDate: "2024-01-08",
      endDate: "2024-01-14",
      totalTime: "7 days",
    },
    {
      juzz: "3",
      startDate: "2024-01-15",
      endDate: "2024-01-21",
      totalTime: "7 days",
    },
    {
      juzz: "4",
      startDate: "2024-01-22",
      endDate: "2024-01-28",
      totalTime: "7 days",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.juzz}</Text>
      <Text style={styles.tableCell}>{item.startDate}</Text>
      <Text style={styles.tableCell}>{item.endDate}</Text>
      <Text style={styles.tableCell}>{item.totalTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Juzz</Text>
        <Text style={styles.headerCell}>Start Date</Text>
        <Text style={styles.headerCell}>End Date</Text>
        <Text style={styles.headerCell}>Total Time</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.juzz}
      />
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});
