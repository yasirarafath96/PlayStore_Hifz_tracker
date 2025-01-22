import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DoughnutChart from "../components/atoms/doughnutChart";
import Feather from "@expo/vector-icons/Feather";
import BarGraph from "../components/atoms/barGraph";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Modal } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import juzzs from "../../constants/juzzs.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import BarChart from "../components/charts/barChart";
import PieChart from "../components/charts/pieChart";

const screenWidth = Dimensions.get("window").width;

const Dashboard = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [overallPercent, setOverallPercent] = useState(0);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [filterPara, setFilterPara] = useState();
  const [showGraph, setShowGraph] = useState(true);
  const [showPie, setShowPie] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    GetCurrentJuzz();
  }, [filterPara]);

  const getData = async () => {
    try {
      const response = await AsyncStorage.getItem(`student_${1}`);
      // const response = await AsyncStorage.getItem("appData");
      const data = JSON.parse(response);
      console.log("response student_1", data);
      const activeStudentId = parseInt(data[0].ActiveStudent, 10); // Convert ActiveStudent to number
      const activeStudentData = data.find(
        (item) => item.id === activeStudentId
      );
      if (activeStudentData) {
        const current = parseFloat(
          activeStudentData.current.currentParaPercent
        );
        const overall = parseFloat(activeStudentData.overAll.overAllPercent);

        setCurrentPercent(current || 0);
        setOverallPercent(overall || 0);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const GetCurrentJuzz = async () => {
    try {
      const response = await AsyncStorage.getItem("current_juzz");
      console.log("Async current juzz", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleParaChange = (paraNumber) => {
    AsyncStorage.setItem("current_juzz", JSON.stringify(paraNumber)) // Convert to string
      .then(() => console.log(`Saved para ${paraNumber} to AsyncStorage`))
      .catch((error) => console.error("Error saving para:", error));
    setFilterPara(paraNumber);
  };

  const overallHifz = useMemo(() => {
    if (overallPercent === 100) {
      return [{ value: 100, color: "green" }]; // One full slice for completed
    }
    return [
      { value: overallPercent, color: "green" },
      { value: 100 - overallPercent, color: "grey" },
    ];
  }, [overallPercent]);

  const currentJuzz = useMemo(() => {
    if (currentPercent === 100) {
      return [{ value: 100, color: "green" }];
    }
    return [
      { value: currentPercent, color: "green" },
      { value: 100 - currentPercent, color: "grey" },
    ];
  }, [currentPercent]);

  return (
    <>
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => getData()}>
          <Text>Retreve</Text>
        </TouchableOpacity> */}
        {/* <View style={styles.chartContainer}>
          <View style={styles.chartWrapper}>
            <DoughnutChart data={overallHifz} />
          </View>
          <View style={styles.chartWrapper}>
            <DoughnutChart data={currentJuzz} />
            <Text style={styles.completionText}>
              {currentPercent === 100 ? "Completed!" : `${currentPercent}%`}
            </Text>
          </View>
        </View> */}

        {/* <View style={styles.percentageContainer}>
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
        </View> */}
        {showPie && <PieChart />}
        {/* {showPie && <PieChart />} */}
        {/* {showGraph && <BarChart />} */}
        
      </View>

      <Modal visible={visibleModal}>
        <>
          <View
            style={{
              backgroundColor: "white",
              width: "60%",
              height: "70%",
              alignSelf: "center",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row-reverse" }}>
              <TouchableOpacity onPress={() => setVisibleModal(false)}>
                <AntDesign name="closecircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 500 }}>Select Juzz</Text>
            </View>
            <Picker
              selectedValue={filterPara}
              onValueChange={(para) => handleParaChange(para)}
              style={styles.picker}
            >
              {juzzs.map((juzz, index) => {
                const paraValue = index + 1;
                return (
                  <Picker.Item
                    key={paraValue}
                    label={`Para ${paraValue}`}
                    value={paraValue}
                    color={filterPara === paraValue ? "#007BFF" : "#000"}
                  />
                );
              })}
            </Picker>
            <View style={{ paddingVertical: 25 }}>
              {filterPara ? (
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                  Selected Juzz: {filterPara}
                </Text>
              ) : null}
            </View>
          </View>
        </>
      </Modal>
    </>
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "green",
    height: "60%",
  },
  chartWrapper: {
    width: "95%",
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 10,
    height: "50%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    elevation: 10,
    marginTop: 10,
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
    marginBottom: 30,
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
    alignSelf: "flex-start", // Align left
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
  progressHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  barGraphContainer: {
    width: "100%",
    paddingHorizontal: 5,
  },
  picker: {
    height: 50,
    width: "90%",
    backgroundColor: "#ACC8E5",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    color: "#112A46",
  },
});
