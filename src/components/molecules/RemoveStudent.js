import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RemoveStudent = ({
  visible,
  setRemoveStudentModalVisible,
  students,
  setStudents,
}) => {
  const [selectedStudents, setSelectedStudents] = useState({});

  // Toggle selected students
  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // Handle Remove Selected
  const removeSelectedStudents = async () => {
    try {
      // Filter out students that are not selected
      const updatedStudents = students.filter(
        (student) => !selectedStudents[student.id]
      );

      // Update AsyncStorage and local state
      await AsyncStorage.setItem(
        "students_list",
        JSON.stringify(updatedStudents)
      );
      setStudents(updatedStudents); // Update parent state
      setRemoveStudentModalVisible(false);
    } catch (error) {
      console.error("Error removing students:", error);
    }
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

          {/* Display list of students */}
          {students.map((student) => (
            <View
              key={student.id}
              style={removeStudentModalStyles.checkboxContainer}
            >
              <Text style={removeStudentModalStyles.studentName}>
                {student.student}
              </Text>
              <TouchableOpacity
                onPress={() => toggleStudentSelection(student.id)}
                style={removeStudentModalStyles.checkbox}
              >
                <Text style={removeStudentModalStyles.checkboxText}>
                  {selectedStudents[student.id] ? "☑️" : "⬜️"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Buttons */}
          <View style={removeStudentModalStyles.buttonRow}>
            <TouchableOpacity
              style={removeStudentModalStyles.removeButton}
              onPress={removeSelectedStudents}
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
  );
};

export default RemoveStudent;

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
    width: 30,
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
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
