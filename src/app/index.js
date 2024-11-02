import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
// import Modal from "./components/atoms/modals";

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    {
      name: "Completed",
      population: 60,
      color: "#28a745",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
    {
      name: "Pending",
      population: 40,
      color: "#dc3545",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.body}>
          <View style={styles.chartContainer}>
            <PieChart
              data={data}
              width={350}
              height={200}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  marginVertical: 8,
                  borderRadius: 0,
                },
              }}
              accessor="population"
              style={{
                margin: 15,
                borderRadius: 16,
              }}
            />
            <PieChart
              data={data}
              width={350}
              height={200}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  marginVertical: 8,
                  borderRadius: 0,
                },
              }}
              accessor="population"
              style={{
                margin: 10,
                borderRadius: 0,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  
  body: {
    flex: 1,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'orange',
  },
  chartContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
