import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SwitchStudentModal = ({
  visible,
  setSwitchStudentModalVisible,
  students,
  onActiveStudentChange,
}) => {
  const [activeStudent, setActiveStudent] = useState(null);

  useEffect(() => {
    if (visible) {
      // getActiveStudent();
      // removeActiveStudent();
      getAllKeys();
    }
  }, [visible]);

  const handleSelectStudent = async (student) => {
    try {
      const updatedStudents = students.map((s) =>
        s.id === student.id ? { ...s, active: true } : { ...s, active: false }
      );

      await AsyncStorage.setItem(
        "students_list",
        JSON.stringify(updatedStudents)
      );

      // Update local state
      setActiveStudent(student);
      onActiveStudentChange(student.student); 
      setSwitchStudentModalVisible(false);

      console.log("Updated students:", updatedStudents);
    } catch (error) {
      console.error("Error updating active student:", error);
    }
  };

  const getAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("All keys in AsyncStorage:", keys);
      return keys; // Optionally return the keys for further use
    } catch (error) {
      console.error("Error fetching all keys from AsyncStorage:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setSwitchStudentModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Switch Student</Text>

          {/* List of Students */}
          {students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentItem,
                activeStudent?.id === student.id && styles.activeStudentItem,
              ]}
              onPress={() => handleSelectStudent(student)}
            >
              <Text
                style={[
                  styles.studentName,
                  activeStudent?.id === student.id && styles.activeStudentName,
                ]}
              >
                {student.student}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Cancel Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setSwitchStudentModalVisible(false)}
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

export default SwitchStudentModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  studentItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  activeStudentItem: {
    backgroundColor: "#E0F7FA", // Highlighted background for active student
  },
  studentName: {
    fontSize: 18,
    color: "#555",
  },
  activeStudentName: {
    fontWeight: "bold",
    color: "#007BFF", // Highlight active student's name
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
