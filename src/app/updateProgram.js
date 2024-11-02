import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const UpdateProgram = () => {
  const [selectedValue, setSelectedValue] = useState("1");

  const handleUpdate = () => {
    Alert.alert("Update", `You have selected: ${selectedValue}`);
  };

  const handleCancel = () => {
    Alert.alert("Cancelled", "Update has been cancelled.");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: 'center', height: 200 }}>
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProgram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    justifyContent: "center", // Center content vertically
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
    borderRadius: 5,
    overflow: "hidden",
    width: 150,
    marginHorizontal: 15,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20, // Space above buttons
  },
  button: {
    flex: 1,
    backgroundColor: "#007BFF", // Button color
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5, // Space between buttons
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
