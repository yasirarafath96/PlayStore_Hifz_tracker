import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const Summary = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    console.log("Fetched")
  }, []);

  const CalculateTotalTime = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return "Invalid Dates";
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const totalMilliseconds = end - start;
    if (totalMilliseconds < 0) {
      return "Invalid Time Range";
    }
  
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`student_${1}`);
      if (jsonData) {
        const dataObject = JSON.parse(jsonData);
        console.log("Retrieved data:", dataObject);

        const transformedData = dataObject
          .filter((item) => item.current) 
          .map((item) => ({
            id: item.id,
            juzz: item.current.currentPara || "N/A", 
            startDate: item.current.startDate || "N/A", 
            endDate: item.current.endDate || 'N/A', 
            totalTime: CalculateTotalTime(item.current.startDate, item.current.endDate) || 'N/A',
          }));
        CalculateTotalTime();
        setData(transformedData);
        console.log("transformedData", transformedData);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

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
      <TouchableOpacity onPress={() => fetchData()}>
        <Text>Retrieve</Text>
      </TouchableOpacity>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Juzz</Text>
        <Text style={styles.headerCell}>Start Date</Text>
        <Text style={styles.headerCell}>End Date</Text>
        <Text style={styles.headerCell}>Total Time</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
