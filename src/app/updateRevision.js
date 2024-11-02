import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const UpdateRevision = () => {
  const [selectedValue, setSelectedValue] = useState("1");

  // Sample data for the table
  const initialData = [
    { surah: "Al-Fatiha", page: 1, mistakes: "0" },
    { surah: "Al-Baqarah", page: 2, mistakes: "0" },
    { surah: "Al-Imran", page: 3, mistakes: "0" },
  ];

  const [data, setData] = useState(initialData);

  const getDotColor = (mistakes) => {
    if (mistakes === "0") return "green";
    if (mistakes === "1" || mistakes === "2") return "orange";
    return "red";
  };

  const handleMistakesChange = (index, value) => {
    const newData = [...data];
    newData[index].mistakes = value;
    setData(newData);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", height: 60 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select Juzz:</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              {Array.from({ length: 30 }, (_, i) => (
                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
              ))}
            </Picker>
          </View>
        </View>
        <Text style={styles.updatedText}>Updated Juzz: {selectedValue}</Text>

        {/* Custom Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Surah</Text>
            <Text style={styles.tableHeaderText}>Page</Text>
            <Text style={styles.tableHeaderText}># of Mistakes</Text>
          </View>
          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.surah}</Text>
              <Text style={styles.tableCell}>{item.page}</Text>
              <View style={styles.mistakesContainer}>
                <Picker
                  selectedValue={item.mistakes}
                  style={styles.picker}
                  onValueChange={(itemValue) => handleMistakesChange(index, itemValue)}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="1 or 2" value="1" />
                  <Picker.Item label="3 or more" value="3" />
                </Picker>
                <View style={[styles.dot, { backgroundColor: getDotColor(item.mistakes) }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateRevision;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    justifyContent: "center", 
  },
  header: {
    height: 50,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 0,
    overflow: "hidden",
    width: 150,
    marginHorizontal: 15,
  },
  picker: {
    height: 40,
    width: 100,
  },
  updatedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  mistakesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
});
