import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AddStudentModal from "./AddStudentModal";

const ProfileModal = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(300));
  const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleSaveStudent = (studentName) => {
    console.log("Student Saved:", studentName);
    // Here, you would typically save the student name to your state or a database
    setAddStudentModalVisible(false); // Close the modal after saving the student
  };

  const handleAddStudentPress = () => {
    setAddStudentModalVisible(true); // Open AddStudentModal
    // onClose(); // Close ProfileModal
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
          >
            <View style={styles.centeredView}>
              <Animated.View
                style={[
                  styles.modalView,
                  { transform: [{ translateX: slideAnim }] },
                ]}
              >
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalText}>Student</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Fontisto name="close-a" size={18} color="#FF6347" />
                  </TouchableOpacity>
                </View>

                {/* Modal Items */}
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={handleAddStudentPress} // Close ProfileModal and open AddStudentModal
                >
                  <FontAwesome6 name="add" size={20} color="#007BFF" />
                  <Text style={styles.modalItemText}>Add Student</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onClose();
                    // Add your action for Remove Student
                  }}
                >
                  <Ionicons name="remove-outline" size={18} color="#FF6347" />
                  <Text style={styles.modalItemText}>Remove Student</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onClose();
                    // Add your action for Switch Student
                  }}
                >
                  <FontAwesome name="exchange" size={20} color="#28A745" />
                  <Text style={styles.modalItemText}>Switch Student</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>

      {/* AddStudentModal */}
      <AddStudentModal
        visible={addStudentModalVisible}
        setAddStudentModalVisible={setAddStudentModalVisible}
        handleSaveStudent={handleSaveStudent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start", // Align at the top
    alignItems: "flex-end", // Align to the right side
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    position: "absolute", // Position absolutely on the screen
    top: 0, // Align to the top of the screen
    right: 0, // Align to the right of the screen
    width: "100%", // Take full width of the screen
    height: "100%", // Take full height of the screen
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 300,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute space between icon and text
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  modalItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
});

export default ProfileModal;
