import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DoughnutChart from "../components/atoms/doughnutChart";
import Feather from "@expo/vector-icons/Feather";
import BarGraph from "../components/atoms/barGraph";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;

const Dashboard = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [overallPercent, setOverallPercent] = useState();
  const [currentPercent, setCurrentPercent] = useState();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const response = await AsyncStorage.getItem("appData")
      const data = JSON.parse(response)
      console.log("response", data.student)
      
    } catch (error) {
      console.log("error", error)
    }
  }

  const overallHifz = [
    { value: overallPercent, color: "green" },
    { value: 100 - overallPercent, color: "grey" },
  ];
  const currentJuzz = [
    { value: currentPercent, color: "green" },
    { value: 100 - currentPercent, color: "grey" },
  ];
  const customProgress = [
    20,
    30,
    80,
    85,
    0, // Keep the first 20%
    0,
    0,
    0,
    0,
    0, // Fill in with zeros
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0, // Fill in more zeros to reach a total of 30
    0,
    0,
    0,
    0, // More zeros
    0,
    0,
    0,
    0, // Fill in more zeros to reach the end
    0,
    30,
    0,
    0,
    10,
    10, // Keep the last 30% value and rest as zeros
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity  
        onPress={() => getData()}
        >
          <Text>Retreve</Text>
        </TouchableOpacity>
      <View style={styles.chartContainer}>
        
        <View style={styles.chartWrapper}>
          <Text style={styles.chartHeaderText}>Overall Hifz</Text>
          <DoughnutChart data={overallHifz} />
        </View>
        <View style={styles.chartWrapper}>
          <Text style={styles.chartHeaderText}>Current Juzz</Text>
          <DoughnutChart data={currentJuzz} />
        </View>
      </View>
      <View style={styles.percentageContainer}>
        <View style={styles.percentageItem}>
          <Text style={styles.percentageText}>{overallHifz[0].value}%</Text>
        </View>
        <View style={[styles.percentageItem, { flexDirection: "row" }]}>
          <Text style={[styles.percentageText, { marginRight: 10 }]}>
            {currentJuzz[0].value}%
          </Text>
          <TouchableOpacity onPress={() => setVisibleModal(true)}>
            <Feather name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressHeader}>Para Progress</Text>
      </View>
      <View style={styles.barGraphContainer}>
        <BarGraph progress={customProgress} />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  chartWrapper: {
    width: "48%",
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 10,
    height: 240,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    elevation: 10,
  },
  chartHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  percentageContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  percentageItem: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 18,
    color: "#333",
  },
  progressContainer: {
    alignSelf: 'flex-start', // Align left
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  progressHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  barGraphContainer: {
    width: "100%",
    paddingHorizontal: 5 
  },
});
