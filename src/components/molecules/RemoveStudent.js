import React, { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const RemoveStudent = ({ visible, setRemoveStudentModalVisible, students }) => {
    const [selectedStudents, setSelectedStudents] = useState({});

    const toggleStudentSelection = (student) => {
        setSelectedStudents((prev) => ({
          ...prev,
          [student]: !prev[student],
        }));
      };
  return (
    <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setRemoveStudentModalVisible(false)}
      >
        <View style={removeStudentModalStyles.overlay}>
          <View style={removeStudentModalStyles.content}>
            <Text style={removeStudentModalStyles.title}>Remove Student</Text>
            {students.map((student) => (
              <View
                key={student}
                style={removeStudentModalStyles.checkboxContainer}
              >
                <Text style={removeStudentModalStyles.studentName}>
                  {student}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleStudentSelection(student)}
                  style={removeStudentModalStyles.checkbox}
                >
                  <Text style={removeStudentModalStyles.checkboxText}>
                    {selectedStudents[student] ? "☑️" : "⬜️"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            <View style={removeStudentModalStyles.buttonRow}>
              <TouchableOpacity
                style={removeStudentModalStyles.removeButton}
              >
                <Text style={removeStudentModalStyles.buttonText}>
                  Remove Selected
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRemoveStudentModalVisible(false)}
                style={removeStudentModalStyles.cancelButton}
              >
                <Text style={removeStudentModalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

export default RemoveStudent

const removeStudentModalStyles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: "80%",
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      elevation: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 20,
    },
    checkboxContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
    },
    studentName: {
      fontSize: 16,
      color: "#555",
    },
    checkbox: {
      width: 30, // Fixed width for checkbox area
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxText: {
      fontSize: 18,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    removeButton: {
      backgroundColor: "#FF6347",
      borderRadius: 5,
      padding: 10,
      flex: 1,
      marginRight: 10, // Space between buttons
    },
    cancelButton: {
      backgroundColor: "#007BFF",
      borderRadius: 5,
      padding: 10,
      flex: 1,
      marginLeft: 10, // Space between buttons
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
  });