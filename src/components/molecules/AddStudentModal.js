import React, { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
            <TouchableOpacity
             
              style={styles.confirmButton}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {setAddStudentModalVisible(false); }}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
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
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: "#28A745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddStudentModal;
