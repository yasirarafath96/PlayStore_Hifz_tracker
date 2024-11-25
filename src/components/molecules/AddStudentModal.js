import React, { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

const AddStudentModal = ({ visible, setAddStudentModalVisible, handleSaveStudent, student }) => {
  const [studentName, setStudentName] = useState("");

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setAddStudentModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Create New Student</Text>

          {/* Input field for student name */}
          <TextInput
            style={styles.input}
            placeholder="Student Name"
            value={studentName}
            onChangeText={setStudentName}
          />

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              buttonColor="#28A745"
              labelStyle={styles.buttonText}
              style={styles.button}
              onPress={() => handleSaveStudent(studentName)}
            >
              Save
            </Button>

            <Button
              mode="contained"
              buttonColor="#FF6347"
              labelStyle={styles.buttonText}
              style={styles.button}
              onPress={() => setAddStudentModalVisible(false)}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: "80%",
    marginVertical: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddStudentModal;
